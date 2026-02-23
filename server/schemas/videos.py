from pydantic import BaseModel, ConfigDict  # 🔥 Import ConfigDict
from datetime import datetime
from typing import Optional

# --- Create ---
class VideoCreate(BaseModel):
    video_id: str
    title: Optional[str] = None
    channel_name: Optional[str] = None
    channel_id: Optional[str] = None
    thumbnail_url: Optional[str] = None
    published_at: Optional[datetime] = None
    fetched_by: Optional[int] = None

# --- Response ---
class VideoResponse(BaseModel):
    id: int
    video_id: str
    title: Optional[str] = None
    channel_name: Optional[str] = None
    channel_id: Optional[str] = None
    view_count: Optional[int] = None
    like_count: Optional[int] = None
    comment_count: Optional[int] = None  # 🔥 Add this if missing
    thumbnail_url: Optional[str] = None
    published_at: Optional[datetime] = None
    fetched_at: Optional[datetime] = None
    fetched_by: Optional[int] = None
    total_comments_fetched: int
    status: str
    error_message: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    # Pydantic v2 syntax
    model_config = ConfigDict(from_attributes=True)

# --- Update ---
class VideoUpdate(BaseModel):
    title: Optional[str] = None
    channel_name: Optional[str] = None
    channel_id: Optional[str] = None
    thumbnail_url: Optional[str] = None
    status: Optional[str] = None
    error_message: Optional[str] = None