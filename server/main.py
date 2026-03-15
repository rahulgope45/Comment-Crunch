from fastapi import FastAPI;
from core.database import engine,Base, db_connection
from contextlib import asynccontextmanager
from routes.auth_routes import router as auth_router
from routes.comment_routes import router as comment_router
from fastapi.middleware.cors import CORSMiddleware

from model.user import User
from model.comment import Comments
from model.videos import Videos



@asynccontextmanager 
async def lifespan(app: FastAPI):
    #Startup
    db_connection()
    print("-----Database connected successfully---")
    
    
    #for new tables
    Base.metadata.create_all(bind = engine)
    # Base.metadata.drop_all(bind=engine) 
    print("-----Table created successfully---")
    yield
 
app = FastAPI(lifespan=lifespan) 

#ALlowed origins
origins=[
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)   

#routes
app.include_router(auth_router,prefix="/api")
app.include_router(comment_router,prefix="/api")





@app.get("/")
def root():
    return {"message": "Server is running"}