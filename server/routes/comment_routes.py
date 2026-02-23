from fastapi import APIRouter,Depends,Query
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional

from controllers.comment_controller import CommentController
from core.database import get_db
from middleware.authy_middleware import get_current_user

router = APIRouter(prefix="/comments", tags=["Comments"])

# Request schema
class FetchCommentsRequest(BaseModel):
    video_url: str
    max_comments: Optional[int] = 500
    force_refresh: Optional[bool] = False
    
    
@router.post("/fetch")
async def fetch_comments(
    request: FetchCommentsRequest,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Fetch comments from a YouTube video
    
    - **video_url**: YouTube video URL
    - **max_comments**: Maximum comments to fetch (default: 500, max: 1000)
    - **force_refresh**: Force re-fetch even if cached
    """
    # Limit max_comments
    max_comments = min(request.max_comments, 1000)
    
    return await CommentController.fetch_comments(
        db=db,
        video_url=request.video_url,
        user_id=current_user["id"],
        max_comments=max_comments,
        force_refresh=request.force_refresh
    )


@router.get("/{video_id}")
async def get_video_comments(
    video_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Get stored comments for a video from database
    
    - **video_id**: Database video ID (from previous fetch)
    """
    return await CommentController.get_video_comments(
        db=db,
        video_id=video_id,
        user_id=current_user["id"]
    )