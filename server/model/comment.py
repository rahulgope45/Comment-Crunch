from sqlalchemy import Column, Integer,String,Text,Boolean,DateTime,func,Float,Index,ForeignKey
# from sqlalchemy.ext.declarative import declarative_base
from core.database import Base
# Base = declarative_base()

class Comments(Base):
    __tablename__ = "comments"
    
    id = Column(Integer, primary_key=True, index=True)
    video_id = Column(Integer, ForeignKey("videos.id", ondelete="CASCADE"), nullable=False)  # Reference to videos(id)
    comment_id = Column(String(255), unique=True, nullable=False)  # YouTube comment ID
    author_name = Column(String(255))
    author_channel_id = Column(String(255))
    author_profile_image_url = Column(Text)
    comment_count = Column(Integer)
    text_original = Column(Text, nullable=False)  # Original comment text
    text_display = Column(Text)  # HTML formatted text (if needed)
    like_count = Column(Integer, default=0)
    reply_count = Column(Integer, default=0)
    is_reply = Column(Boolean, default=False)  # Fixed typo: id_reply → is_reply
    parent_id = Column(String(255))  # If it's a reply, parent comment ID
    published_at = Column(DateTime)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    # Future sentiment analysis
    sentiment = Column(String(20))  # positive/neutral/negative
    sentiment_score = Column(Float)  # 0.0 to 1.0
    is_noise = Column(Boolean, default=False)  # For noise cancellation service
    
    created_at = Column(DateTime, default=func.now())
    
    __table_args__ = (
        Index("idx_comments_video_id", "video_id"),
        Index("idx_comments_comment_id", "comment_id"),
        Index("idx_comments_parent_id", "parent_id"),
    )