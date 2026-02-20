from googleapiclient.errors import HttpError
from sqlalchemy.orm import Session

from typing import List, Optional, Dict
from utils.youtube_service import get_youtube_service
from model.videos import Videos
from model.comment import Comments
from schemas.videos import VideoCreate
from schemas.comments import CommentCreate


class YoutubeFetcherService:
    """
    Service for fetching Youtube data and storing in database
    """
    
    @staticmethod
    def fetch_video_metadata(video_id:str) -> Optional[Dict]:
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
            
            if not response.get('items'):
                return None
            
            video_data = response['items'][0]
            snpippet = video_data['snippet']
            statistics= video_data.get('statistics',{})
            
            return{
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