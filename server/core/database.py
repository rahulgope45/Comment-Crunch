from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine 
)

Base = declarative_base()

def get_db():
    db =SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
def db_connection():
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))
