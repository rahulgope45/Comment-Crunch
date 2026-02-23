from pydantic import BaseModel, EmailStr, ConfigDict
from datetime import datetime
from typing import Optional

# User
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    username: str
    profilepic: Optional[str] = None
    
# Response   
class UserResponses(BaseModel):
    id: int
    email: str
    username: str
    profilepic: Optional[str] = None
    created_at: datetime
    
    # Pydantic v2 syntax
    model_config = ConfigDict(from_attributes=True)
    
# Login
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Update
class UserUpdate(BaseModel):
    email: Optional[str] = None
    username: Optional[str] = None