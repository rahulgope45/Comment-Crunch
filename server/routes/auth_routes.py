from fastapi import APIRouter,Depends,Response,Request
from sqlalchemy.orm import Session
from controllers.auth_controller import AuthCpontroller
from schemas.user import UserCreate,UserLogin,UserResponses
from core.database import get_db 


router = APIRouter(prefix="/auth",tags=["Authentication"])

@router.post("/signup",response_model=UserResponses,status_code=201)
async def signup(user:UserCreate,response:Response,db: Session = Depends(get_db)):
    return await AuthCpontroller.signup(db,user,response)
    
    

@router.post("/login",response_model=UserResponses,status_code=201)
async def login(user:UserLogin,response:Response,db: Session = Depends(get_db)):
    return await AuthCpontroller.login(db,user,response)

@router.post("/logout",status_code=201)
async def logout(response:Response):
    return await AuthCpontroller.logout(response)

@router.get("/me", response_model=UserResponses)
async def read_users_me(request: Request, db: Session = Depends(get_db)):
    user = await AuthCpontroller.get_current_user(request, db)
    return user