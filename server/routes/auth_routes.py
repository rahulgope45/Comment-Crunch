from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from controllers.auth_controller import AuthCpontroller
from schemas.user import UserCreate,UserLogin,UserResponses
from core.database import get_db 


router = APIRouter(prefix="/auth",tags=["Authentication"])

@router.post("/signup",response_model=UserResponses,status_code=201)
async def signup(user:UserCreate,db: Session = Depends(get_db)):
    return await AuthCpontroller.signup(db,user)

@router.post("/login",response_model=UserResponses,status_code=201)
async def login(user:UserLogin,db: Session = Depends(get_db)):
    return await AuthCpontroller.login(db,user)