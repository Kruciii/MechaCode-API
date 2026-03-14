import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# DANE Z TWOJEGO DOCKER-COMPOSE (sekcja app-db):
POSTGRES_USER = "admin"
POSTGRES_PASSWORD = "admin"
POSTGRES_DB = "AppDb"
POSTGRES_HOST = "app-db" # To jest nazwa serwisu z docker-compose

SQLALCHEMY_DATABASE_URL = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:5432/{POSTGRES_DB}"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()