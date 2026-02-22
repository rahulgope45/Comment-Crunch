from googleapiclient.errors import HttpError
from sqlalchemy.orm import Session
from sqlalchemy import and_
from datetime import datetime, timezone, timedelta
from typing import List, Optional, Dict
import time

from utils.youtube_service import get_youtube_service
from model.videos import Videos
from model.comment import Comments
from schemas.videos import VideoCreate
from schemas.comments import CommentCreate


class YoutubeFetcherService:
    """Service for fetching YouTube data and storing in database"""
    
    @staticmethod
    def fetch_video_metadata(video_id: str) -> Optional[Dict]:
        """
        Fetch video metadata from YouTube API
        
        Returns:
            Dict with video details or None if error
        """
        try:
            youtube = get_youtube_service()
            if not youtube:
                return None
            
            request = youtube.videos().list(
                part="snippet,statistics",
                id=video_id
            )
            response = request.execute()
            
            if not response.get('items'):
                return None
            
            video_data = response['items'][0]
            snippet = video_data['snippet']
            statistics = video_data.get('statistics', {})
            
            return {
                "video_id": video_id,
                "title": snippet.get('title'),
                "channel_name": snippet.get('channelTitle'),
                "channel_id": snippet.get('channelId'),
                "view_count": int(statistics.get('viewCount', 0)),
                "like_count": int(statistics.get('likeCount', 0)),
                "comment_count": int(statistics.get('commentCount', 0)),
                "thumbnail_url": snippet.get('thumbnails', {}).get('high', {}).get('url'),
                "published_at": datetime.fromisoformat(snippet['publishedAt'].replace('Z', '+00:00'))
            }
            
        except HttpError as e:
            print(f"YouTube API Error: {e}")
            return None
        except Exception as e:
            print(f"Error fetching video metadata: {e}")
            return None
    
    @staticmethod
    def fetch_comments(video_id: str, max_comments: int = 500) -> List[Dict]:
        """
        Fetch comments from YouTube API with pagination
        
        Args:
            video_id: YouTube video ID
            max_comments: Maximum number of comments to fetch
        
        Returns:
            List of comment dictionaries
        """
        try:
            youtube = get_youtube_service()
            if not youtube:
                return []
            
            comments = []
            next_page_token = None
            
            while len(comments) < max_comments:
                request = youtube.commentThreads().list(
                    part="snippet",
                    videoId=video_id,
                    maxResults=min(100, max_comments - len(comments)),  # API max is 100
                    pageToken=next_page_token,
                    order="relevance"  # Get most relevant comments first
                )
                
                response = request.execute()
                
                # Process comments from response
                for item in response.get('items', []):
                    snippet = item['snippet']['topLevelComment']['snippet']
                    
                    comment_data = {
                        "comment_id": item['snippet']['topLevelComment']['id'],
                        "author_name": snippet.get('authorDisplayName'),
                        "author_channel_id": snippet.get('authorChannelId', {}).get('value'),
                        "author_profile_image_url": snippet.get('authorProfileImageUrl'),
                        "text_original": snippet.get('textOriginal'),
                        "text_display": snippet.get('textDisplay'),
                        "like_count": snippet.get('likeCount', 0),
                        "reply_count": item['snippet'].get('totalReplyCount', 0),
                        "is_reply": False,
                        "parent_id": None,
                        "published_at": datetime.fromisoformat(snippet['publishedAt'].replace('Z', '+00:00'))
                    }
                    comments.append(comment_data)
                
                # Check if there are more pages
                next_page_token = response.get('nextPageToken')
                if not next_page_token or len(comments) >= max_comments:
                    break
                
                # Small delay to avoid rate limiting
                time.sleep(0.1)
            
            return comments[:max_comments]
            
        except HttpError as e:
            error_content = e.content.decode('utf-8') if e.content else str(e)
            
            # Check for specific errors
            if 'commentsDisabled' in error_content:
                raise Exception("Comments are disabled for this video")
            elif 'videoNotFound' in error_content:
                raise Exception("Video not found")
            else:
                print(f"YouTube API Error: {e}")
                raise Exception(f"Failed to fetch comments: {str(e)}")
                
        except Exception as e:
            print(f"Error fetching comments: {e}")
            raise e
    
    @staticmethod
    def check_video_exists(db: Session, video_id: str, user_id: int) -> Optional[Videos]:
        """
        Check if video already exists in database for this user
        
        Returns:
            Video object if exists and fetched in last 24 hours, else None
        """
        twenty_four_hours_ago = datetime.now(timezone.utc) - timedelta(hours=24)
        
        video = db.query(Videos).filter(
            and_(
                Videos.video_id == video_id,
                Videos.fetched_by == user_id,
                Videos.fetched_at >= twenty_four_hours_ago,
                Videos.status == "completed"
            )
        ).first()
        
        return video
    
    @staticmethod
    def save_video_to_db(db: Session, video_data: Dict, user_id: int) -> Videos:
        """
        Save video metadata to database
        
        Returns:
            Video object
        """
        # Check if video already exists (by video_id only, not user)
        existing_video = db.query(Videos).filter(
            Videos.video_id == video_data['video_id']
        ).first()
        
        if existing_video:
            # Update existing video
            for key, value in video_data.items():
                setattr(existing_video, key, value)
            existing_video.fetched_by = user_id
            existing_video.fetched_at = datetime.now(timezone.utc)
            existing_video.status = "pending"
            db.commit()
            db.refresh(existing_video)
            return existing_video
        else:
            # Create new video
            new_video = Videos(
                **video_data,
                fetched_by=user_id,
                fetched_at=datetime.now(timezone.utc),
                status="pending"
            )
            db.add(new_video)
            db.commit()
            db.refresh(new_video)
            return new_video
    
    @staticmethod
    def save_comments_to_db(db: Session, comments: List[Dict], video_db_id: int) -> int:
        """
        Bulk save comments to database
        
        Args:
            db: Database session
            comments: List of comment dictionaries
            video_db_id: Database ID of the video (not YouTube video_id)
        
        Returns:
            Number of comments saved
        """
        if not comments:
            return 0
        
        # Delete old comments for this video (if re-fetching)
        db.query(Comments).filter(Comments.video_id == video_db_id).delete()
        
        # Prepare comment objects
        comment_objects = []
        for comment_data in comments:
            comment_obj = Comments(
                video_id=video_db_id,
                **comment_data
            )
            comment_objects.append(comment_obj)
        
        # Bulk insert
        db.bulk_save_objects(comment_objects)
        db.commit()
        
        return len(comment_objects)
    
    @staticmethod
    def update_video_status(db: Session, video_id: int, status: str, 
                           total_fetched: int = 0, error_message: str = None):
        """
        Update video fetch status
        """
        video = db.query(Videos).filter(Videos.id == video_id).first()
        if video:
            video.status = status
            video.total_comments_fetched = total_fetched
            if error_message:
                video.error_message = error_message
            video.updated_at = datetime.now(timezone.utc)
            db.commit()