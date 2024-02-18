from pydantic import BaseModel, Field, validator
from typing import Optional


class Note(BaseModel):
    title: str
    content: str
    user_id: Optional[str] = None

