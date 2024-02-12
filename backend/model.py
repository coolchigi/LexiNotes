from pydantic import BaseModel
from typing import Optional

class Note(BaseModel):
    note_id: int
    title: str
    content: str
    user_id: Optional[str] = None