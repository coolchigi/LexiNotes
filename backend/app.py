from fastapi import FastAPI, HTTPException, Path
from fastapi.middleware.cors import CORSMiddleware
from model import Note
from database import(fetch_all_notes, create_note, fetch_one_note, update_note, remove_note)

app = FastAPI()

origins = ['https://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return {"Welcome To": "FastAPI React APP⚡"}

@app.get("/api/notes")
async def get_todo():
    response = await fetch_all_notes()
    return response

@app.post("/api/notes")
async def post_todo(note: Note):
    response = await create_note(note)
    if response:
        return response
    raise HTTPException(400, "Something went wrong")
    

@app.get("/api/notes/{id}")
async def get_single_todo(id: str = Path(...)):
    response = await fetch_one_note(id)
    if response:
        return response
    raise HTTPException(404, f"There is no note with the id {id}")