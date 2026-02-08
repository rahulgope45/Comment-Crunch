from fastapi import FastAPI;
from core.database import engine,Base, db_connection
from contextlib import asynccontextmanager
from routes.auth_routes import router as auth_router



@asynccontextmanager
async def lifespan(app: FastAPI):
    #Startup
    db_connection()
    print("-----Database connected successfully---")
    Base.metadata.create_all(bind = engine)
    yield
 
app = FastAPI(lifespan=lifespan)    

#routes
app.include_router(auth_router,prefix="/api")

@app.get("/")
def root():
    return {"message": "Server is running"}