from fastapi import APIRouter,Depends,Query
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional

from controllers.comment_controller import CommentController
from core.database import get_db
# from middleware.auth_middleware import get_current_user