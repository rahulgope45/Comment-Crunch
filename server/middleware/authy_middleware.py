from fastapi import Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer
from typing import Optional
from sqlalchemy.orm import Session

from utils.auth_utils import verify_token
from core.database import get_db
from model.user import User

# OAuth2 scheme (for extracting token from Authorization header as backup)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login", auto_error=False)


def get_token_from_cookie(request: Request) -> Optional[str]:
    """
    Extract JWT token from cookie
    
    Args:
        request: FastAPI Request object
    
    Returns:
        Token string or None
    """
    token = request.cookies.get("access_token")
    if token and token.startswith("Bearer "):
        return token.replace("Bearer ", "")
    return token


async def get_current_user(
    request: Request,
    token: Optional[str] = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> dict:
    """
    Get current authenticated user from JWT token
    
    Checks both:
    1. Cookie (primary method)
    2. Authorization header (fallback)
    
    Args:
        request: FastAPI request object
        token: Token from Authorization header (optional)
        db: Database session
    
    Returns:
        Dictionary with user info
    
    Raises:
        HTTPException: If token is invalid or user not found
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    # Try to get token from cookie first
    token_from_cookie = get_token_from_cookie(request)
    final_token = token_from_cookie or token
    
    if not final_token:
        raise credentials_exception
    
    # Verify token
    payload = verify_token(final_token)
    if payload is None:
        raise credentials_exception
    
    # Extract user info from token
    user_email: str = payload.get("sub")
    user_id: int = payload.get("user_id")
    
    if user_email is None or user_id is None:
        raise credentials_exception
    
    # Optional: Verify user exists in database
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise credentials_exception
    
    # Return user data
    return {
        "id": user.id,
        "email": user.email,
        "username": user.username
    }


async def get_current_user_optional(
    request: Request,
    token: Optional[str] = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> Optional[dict]:
    """
    Get current user but don't raise exception if not authenticated
    Use this for optional authentication endpoints
    
    Returns:
        User dict if authenticated, None otherwise
    """
    try:
        return await get_current_user(request, token, db)
    except HTTPException:
        return None