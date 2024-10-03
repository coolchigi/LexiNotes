from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List

import database
from models import NoteModel, NoteCreate, NoteUpdate, ColorPalette, ColorPaletteCreate

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# CRUD operations for notes
@app.post("/notes", response_model=NoteModel)
async def create_note(note: NoteCreate):
    return await database.create_note(note)

@app.get("/notes", response_model=List[NoteModel])
async def read_notes(skip: int = 0, limit: int = 10):
    return await database.get_notes(skip, limit)

@app.get("/notes/{note_id}", response_model=NoteModel)
async def read_note(note_id: str):
    note = await database.get_note(note_id)
    if note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    return note

@app.put("/notes/{note_id}", response_model=NoteModel)
async def update_note(note_id: str, note_update: NoteUpdate):
    updated_note = await database.update_note(note_id, note_update)
    if updated_note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    return updated_note

@app.delete("/notes/{note_id}")
async def delete_note(note_id: str):
    delete_result = await database.delete_note(note_id)
    if delete_result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Note not found")
    return {"message": "Note deleted successfully"}

# Search functionality
@app.get("/search", response_model=List[NoteModel])
async def search_notes(q: str):
    return await database.search_notes(q)

# Get tags
@app.get("/tags", response_model=List[str])
async def get_tags():
    return await database.get_all_tags()

# Get categories
@app.get("/categories", response_model=List[str])
async def get_categories():
    return await database.get_all_categories()

# Color palette operations
@app.post("/color-palettes", response_model=ColorPalette)
async def create_color_palette(palette: ColorPaletteCreate, user_id: str = "default"):
    return await database.create_color_palette(palette, user_id)

@app.get("/color-palettes", response_model=List[ColorPalette])
async def get_color_palettes(user_id: str = "default"):
    return await database.get_color_palettes(user_id)

@app.put("/color-palettes/{palette_id}", response_model=ColorPalette)
async def update_color_palette(palette_id: str, palette: ColorPaletteCreate, user_id: str = "default"):
    updated_palette = await database.update_color_palette(palette_id, palette, user_id)
    if updated_palette is None:
        raise HTTPException(status_code=404, detail="Color palette not found")
    return updated_palette

@app.delete("/color-palettes/{palette_id}")
async def delete_color_palette(palette_id: str, user_id: str = "default"):
    delete_result = await database.delete_color_palette(palette_id, user_id)
    if delete_result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Color palette not found")
    return {"message": "Color palette deleted successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)