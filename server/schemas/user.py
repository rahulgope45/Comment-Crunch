from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional


# User
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    username: str
    profilepic: Optional[str] = None
    
#response   
class UserResponses(BaseModel):
    id: int
    email: str
    username: str
    profilepic: Optional[str] = None
    created_at: datetime

#update
class UserUpdate(BaseModel):
    email: Optional[str] = None
    username: Optional[str] = None

    
    

