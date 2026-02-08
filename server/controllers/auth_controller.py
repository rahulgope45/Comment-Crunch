from fastapi import FastAPI,HTTPException,status
from schemas.user import UserCreate , UserResponses,UserLogin,UserUpdate
import bcrypt
from model.user import User
from datetime import datetime
from sqlalchemy.orm import Session


class AuthCpontroller:
    
    @staticmethod
    async def signup(db:Session,user: UserCreate) -> UserResponses:
        """
        Docstring for signup
        
        :param db: Description
        :type db: Session
        :param user: Description
        :type user: UserCreate
        :return: Description
        :rtype: UserResponses
        """
        #Checking user exist or not
        existing_user= db.query(User).filter(
            (User.email == user.email) | (User.username == user.username)
        ).first()
        
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User with this email or username exists"
            )
        
        hased_pw = bcrypt.hashpw(user.password.encode("utf-8"),bcrypt.gensalt()).decode("utf-8")
        
        # intstance 
        new_user = User(
            email=user.email,
            password=hased_pw,
            username=user.username,
            profilepic=user.profilepic,
            created_at=datetime.utcnow()
        )
        
        #Presist to DB
        
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        
        
        
        #User response
        return UserResponses(
            id=new_user.id,
            email=new_user.email,
            username=new_user.username,
            profilepic=new_user.profilepic,
            created_at=new_user.created_at
            
        )
        
        