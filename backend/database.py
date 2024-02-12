import motor.motor_asyncio
from model import Note
import os
from dotenv import load_dotenv
import uuid

load_dotenv("env/.env_file")

client = motor.motor_asyncio.AsyncIOMotorClient(os.getenv("DB_URL"))
database = client.NotesDB
collection = database.notes

async def fetch_all_notes():
    notes = []
    async for note in collection.find():
        notes.append(Note(**note))
    return notes

# async def create_note(note):
#     note = note.dict()
#     result = await collection.insert_one(note)
#     return note

async def create_note(note):
    # Generate a unique user_id in the format "user_xxx"
    user_id = "user_" + str(uuid.uuid4().hex[:3])
    # Add the user_id to the note
    note = note.dict()
    note["user_id"] = user_id
    # Insert the note into the MongoDB collection
    result = await collection.insert_one(note)
    return note

async def fetch_one_note(id):
    note = await collection.find_one({"_id": id})
    return note

async def update_note(id, data):
    await collection.update_one({"_id": id}, {"$set": data})
    note = await collection.find_one({"_id": id})
    return note

async def remove_note(id):
    await collection.delete_one({"_id": id})
    return True
