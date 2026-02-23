from pydantic import BaseModel, ConfigDict  # Import ConfigDict
from datetime import datetime
from typing import Optional

# --- Create ---
class CommentCreate(BaseModel):
    video_id: int
    comment_id: str
    author_name: Optional[str] = None
    author_channel_id: Optional[str] = None
    author_profile_image_url: Optional[str] = None
    text_original: str
    text_display: Optional[str] = None
    parent_id: Optional[str] = None
    is_reply: Optional[bool] = False
    published_at: Optional[datetime] = None

# --- Response ---
class CommentResponse(BaseModel):
    id: int
    video_id: int
    comment_id: str
    author_name: Optional[str] = None
    author_channel_id: Optional[str] = None
    author_profile_image_url: Optional[str] = None
    text_original: str
    text_display: Optional[str] = None
    like_count: int
    reply_count: int
    is_reply: bool
    parent_id: Optional[str] = None
    published_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    sentiment: Optional[str] = None
    sentiment_score: Optional[float] = None
    is_noise: Optional[bool] = None
    created_at: datetime

    # Pydantic v2 syntax
    model_config = ConfigDict(from_attributes=True)

# --- Update ---
class CommentUpdate(BaseModel):
    text_original: Optional[str] = None
    text_display: Optional[str] = None
    like_count: Optional[int] = None
    reply_count: Optional[int] = None
    is_reply: Optional[bool] = None
    parent_id: Optional[str] = None
    sentiment: Optional[str] = None
    sentiment_score: Optional[float] = None
    is_noise: Optional[bool] = None