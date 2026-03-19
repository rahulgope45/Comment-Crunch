from sqlalchemy import Column,String,Integer,DateTime
from datetime import datetime ,timezone
from core.database import Base

class User(Base):
    __tablename__ = "users"
    
    id =Column(Integer, primary_key=True,index=True)
    email=Column(String, unique=True,index=True,nullable=False)
    password=Column(String, nullable=False)
    username=Column(String, unique=True,index=True,nullable=False)
    profilepic=Column(String,nullable=True)
    created_at=Column(DateTime,default=lambda: datetime.now(timezone.utc))
    updated_at=Column(DateTime,default=lambda:datetime.now(timezone.utc),onupdate=lambda: datetime.now(timezone.utc))