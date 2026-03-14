from sqlalchemy import Column, Integer, String, Text
from database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    short_content = Column(String)
    content = Column(Text, nullable=False)
    initial_code = Column(Text)
    status = Column(String, default="NOT_STARTED")
    semester = Column(String)
    language = Column(String)
    language_id = Column(Integer)
    difficulty = Column(String)
    topic = Column(String)