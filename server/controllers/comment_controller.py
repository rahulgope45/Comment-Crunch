from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from typing import Dict
import time

from services.youtube_fetcher import YoutubeFetcherService
from utils.youtube_service import extract_video_id
from schemas.videos import VideoResponse
from schemas.comments import CommentResponse
from model.videos import Videos
from model.comment import Comments


class CommentController:
    """Controller for handling comment fetch requests"""

    @staticmethod
    async def fetch_comments(
        db: Session,
        video_url: str,
        user_id: int,
        max_comments: int = 500,
        force_refresh: bool = False,
    ) -> Dict:
        """
        Main method to fetch comments from YouTube video

        Args:
            db: Database session
            video_url: YouTube video URL
            user_id: ID of user making request
            max_comments: Maximum comments to fetch (default 500)
            force_refresh: Force re-fetch even if cached

        Returns:
            Dict containing video data and comments
        """
        start_time = time.time()

        # Step 1: Extract video ID from URL
        video_id = extract_video_id(video_url)
        if not video_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid YouTube URL or video ID",
            )

        # Step 2: Check if already fetched (cache)
        if not force_refresh:
            cached_video = YoutubeFetcherService.check_video_exists(
                db, video_id, user_id
            )
            if cached_video:
                # Return cached data
                comments = (
                    db.query(Comments)
                    .filter(Comments.video_id == cached_video.id)
                    .limit(max_comments)
                    .all()
                )

                return {
                    "status": "success",
                    "source": "cache",
                    "video": VideoResponse.from_orm(cached_video),
                    "comments": [CommentResponse.from_orm(c) for c in comments],
                    "summary": {
                        "total_fetched": len(comments),
                        "fetch_time_seconds": 0,
                        "cached": True,
                    },
                }

        # Step 3: Fetch video metadata
        try:
            video_metadata = YoutubeFetcherService.fetch_video_metadata(video_id)
            if not video_metadata:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Video not found or is private",
                )
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

        # Step 4: Save video to database
        video_db = YoutubeFetcherService.save_video_to_db(db, video_metadata, user_id)

        # Step 5: Fetch comments
        try:
            comments_data = YoutubeFetcherService.fetch_comments(video_id, max_comments)
        except Exception as e:
            # Update video status to failed
            YoutubeFetcherService.update_video_status(
                db, video_db.id, "failed", error_message=str(e)
            )
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

        # Step 6: Save comments to database
        save_result = YoutubeFetcherService.save_comments_to_db(
            db, comments_data, video_db.id
        )

        # Step 7: Update video status to completed
        YoutubeFetcherService.update_video_status(
            db, video_db.id, "completed", total_fetched=save_result["valid"]
        )

        # Step 8: Fetch and return saved data
        db.refresh(video_db)
        saved_comments = (
            db.query(Comments)
            .filter(Comments.video_id == video_db.id, Comments.is_noise == False)
            .all()
        )

        end_time = time.time()

        # Calculate sentiment stats
        valid_count = save_result["valid"]
        sentiment_breakdown = save_result["sentiment_breakdown"]

        positive_count = sentiment_breakdown["positive"]
        neutral_count = sentiment_breakdown["neutral"]
        negative_count = sentiment_breakdown["negative"]

        # Calculate percentages
        positive_pct = (
            round((positive_count / valid_count * 100), 1) if valid_count > 0 else 0
        )
        neutral_pct = (
            round((neutral_count / valid_count * 100), 1) if valid_count > 0 else 0
        )
        negative_pct = (
            round((negative_count / valid_count * 100), 1) if valid_count > 0 else 0
        )

        # Overall sentiment
        if positive_count > negative_count and positive_count > neutral_count:
            overall_sentiment = "positive"
        elif negative_count > positive_count and negative_count > neutral_count:
            overall_sentiment = "negative"
        else:
            overall_sentiment = "neutral"

        # Sentiment score
        sentiment_score = round(
            ((positive_count - negative_count) / valid_count) if valid_count > 0 else 0,
            2,
        )

        return {
            "status": "success",
            "source": "youtube_api",
            "video": VideoResponse.from_orm(video_db),
            "comments": [CommentResponse.from_orm(c) for c in saved_comments],
            "summary": {
                "total_fetched": save_result["total"],
                "valid_comments": save_result["valid"],
                "rejected_comments": save_result["rejected"],
                "fetch_time_seconds": round(end_time - start_time, 2),
                "cached": False,
            },
            "sentiment_analysis": {
                "counts": {
                    "positive": positive_count,
                    "neutral": neutral_count,
                    "negative": negative_count,
                },
                "percentages": {
                    "positive": positive_pct,
                    "neutral": neutral_pct,
                    "negative": negative_pct,
                },
                "overall": overall_sentiment,
                "score": sentiment_score,
            },
        }

    @staticmethod
    async def get_video_comments(db: Session, video_id: int, user_id: int) -> Dict:
        """
        Get comments for a video from database

        Args:
            db: Database session
            video_id: Database video ID (not YouTube video_id)
            user_id: User making request

        Returns:
            Dict with video and comments
        """
        # Get video
        video = db.query(Videos).filter(Videos.id == video_id).first()
        if not video:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Video not found"
            )

        # Get comments
        comments = db.query(Comments).filter(Comments.video_id == video_id).all()

        return {
            "status": "success",
            "video": VideoResponse.from_orm(video),
            "comments": [CommentResponse.from_orm(c) for c in comments],
            "summary": {"total_comments": len(comments)},
        }
