from sqlalchemy import Column, Integer, String, Text, BigInteger, DateTime, ForeignKey,Index
from sqlalchemy.sql import func 
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Videos(Base):
    __tablename__ = "videos"
    
    id = Column(Integer, primary_key=True, index=True)
    video_id = Column(String(11), unique=True, nullable=False)
    title = Column(Text)
    channel_name = Column(String(255))
    channel_id = Column(String(255))
    view_count = Column(BigInteger)
    like_count = Column(Integer)
    thumbnail_url = Column(Text)
    published_at = Column(DateTime)
    fetched_at = Column(DateTime, default=func.now())
    fetched_by = Column(Integer, ForeignKey("user.id"))
    total_comments_fetched = Column(Integer, default=0)
    status = Column(String(50), default="pending")  # pending/complete/failed
    error_message = Column(Text)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    __table_args__ =(
        Index("idx_videos_video_id","video_id"),
        Index("idx_videos_channel_id","channel_id"),
    )

