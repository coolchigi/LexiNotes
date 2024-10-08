import os
from bson import ObjectId
from datetime import datetime
from dotenv import load_dotenv
from pymongo import MongoClient

from model import NoteCreate, NoteUpdate, ColorPaletteCreate

# Load config from a .env file:
load_dotenv()
MONGODB_URI = os.environ['MONGODB_URI']
# Connect to your MongoDB cluster:
client = MongoClient(MONGODB_URI)

for db_info in client.list_database_names():
   print(db_info)

notes_database = client.NotesDB
notes_collection = notes_database.notes

# Note operations
def create_note(note: NoteCreate):
    note_dict = note.dict()
    note_dict["created_at"] = datetime.utcnow()
    note_dict["updated_at"] = datetime.utcnow()
    result =  notes_collection.insert_one(note_dict)
    return notes_collection.find_one({"_id": result.inserted_id})

def get_notes(skip: int = 0, limit: int = 10):
    return list(notes_collection.find().skip(skip).limit(limit))

def get_note(note_id: str):
    return notes_collection.find_one({"_id": ObjectId(note_id)})

def update_note(note_id: str, note_update: NoteUpdate):
    update_data = note_update.dict(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    return notes_collection.find_one_and_update(
        {"_id": ObjectId(note_id)},
        {"$set": update_data},
        return_document=True
    )

def delete_note(note_id: str):
    return notes_collection.delete_one({"_id": ObjectId(note_id)})

def search_notes(query: str):
    search_query = {
        "$or": [
            {"title": {"$regex": query, "$options": "i"}},
            {"content": {"$regex": query, "$options": "i"}},
            {"tags": {"$in": [query]}},
            {"category": {"$regex": query, "$options": "i"}}
        ]
    }
    return notes_collection.find(search_query).to_list(length=100)

# async def get_all_tags():
#     return await notes_collection.distinct("tags")

# async def get_all_categories():
#     return await notes_collection.distinct("category")

# # Color palette operations
# async def create_color_palette(palette: ColorPaletteCreate, user_id: str):
#     palette_dict = palette.dict()
#     palette_dict["user_id"] = user_id
#     result = await color_palettes_collection.insert_one(palette_dict)
#     return await color_palettes_collection.find_one({"_id": result.inserted_id})

# async def get_color_palettes(user_id: str):
#     return await color_palettes_collection.find({"user_id": user_id}).to_list(length=100)

# async def update_color_palette(palette_id: str, palette: ColorPaletteCreate, user_id: str):
#     return await color_palettes_collection.find_one_and_update(
#         {"_id": ObjectId(palette_id), "user_id": user_id},
#         {"$set": palette.dict()},
#         return_document=True
#     )

# async def delete_color_palette(palette_id: str, user_id: str):
#     return await color_palettes_collection.delete_one({"_id": ObjectId(palette_id), "user_id": user_id})