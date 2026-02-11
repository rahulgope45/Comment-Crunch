from fastapi import FastAPI, HTTPException, status, Response
from schemas.user import UserCreate, UserResponses, UserLogin, UserUpdate
import bcrypt
from model.user import User
from datetime import datetime, timezone, timedelta
from sqlalchemy.orm import Session
from utils.auth_utils import verify_password, create_access_token


class AuthCpontroller:

    @staticmethod
    async def signup(
        db: Session, user: UserCreate, response: Response
    ) -> UserResponses:
        """
        Docstring for signup

        :param db: Description
        :type db: Session
        :param user: Description
        :type user: UserCreate
        :return: Description
        :rtype: UserResponses
        """
        # Checking user exist or not
        existing_user = (
            db.query(User)
            .filter((User.email == user.email) | (User.username == user.username))
            .first()
        )

        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User with this email or username exists",
            )

        hased_pw = bcrypt.hashpw(
            user.password.encode("utf-8"), bcrypt.gensalt()
        ).decode("utf-8")

        # intstance
        new_user = User(
            email=user.email,
            password=hased_pw,
            username=user.username,
            profilepic=user.profilepic,
            created_at=datetime.now(timezone.utc),
        )

        # Presist to DB

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        # Creating token
        access_token = create_access_token(
            data={"sub": new_user.email, "user_id": new_user.id}
        )

        response.set_cookie(
            key="access_token",
            value=f"Bearer {access_token}",
            httponly=True,
            max_age=1800,
            expires=1800,
            samesite="lax",
            secure=False,
        )

        # User response
        return UserResponses(
            id=new_user.id,
            email=new_user.email,
            username=new_user.username,
            profilepic=new_user.profilepic,
            created_at=new_user.created_at,
        )

    @staticmethod
    async def login(db: Session, user: UserLogin, response: Response) -> UserResponses:
        """
        Docstring for login

        :param db: Description
        :type db: Session
        :param user: Description
        :type user: UserLogin
        :return: Description
        :rtype: UserResponses
        """
        # checkinh User exist or not
        db_user = db.query(User).filter(User.email == user.email).first()
        if not db_user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
            )

        # comparing password with hashed password
        if not bcrypt.checkpw(
            user.password.encode("utf-8"), db_user.password.encode("utf-8")
        ):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid password"
            )

        access_token = create_access_token(data={"sub": db_user.email, "user_id": db_user.id})

        response.set_cookie(
            key="access_token",
            value=f"Bearer {access_token}",
            httponly=True,
            max_age=1800,
            expires=1800,
            samesite="lax",
            secure=False,
        )
        return UserResponses(
            id=db_user.id,
            email=db_user.email,
            username=db_user.username,
            profilepic=db_user.profilepic,
            created_at=db_user.created_at,
        )

    @staticmethod
    async def logout(response: Response):
        """
        Docstring for logout

        :param response: Description
        :type response: Response
        """
        response.delete_cookie(
            key="access_token",
            path="/",  # 🔥 Add this
            samesite="lax",  # 🔥 Must match signup/login
            secure=False,  # 🔥 Must match signup/login (True in production)
            httponly=True,
        )
        return {"message": "Logged out successfully"}
