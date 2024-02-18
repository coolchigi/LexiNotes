import motor.motor_asyncio
from fastapi import HTTPException
from schematics.exceptions import DataError
from model import Note
import os
from dotenv import load_dotenv
import uuid

load_dotenv("env/.env_file")

client = motor.motor_asyncio.AsyncIOMotorClient(os.getenv("DB_WRITE"))
database = client.NotesDB
collection = database.notes

async def fetch_all_notes():
    notes = []
    async for note in collection.find():
        notes.append(Note(**note))
    return notes

def create_note(note: Note):
    collection.insert_one(note.dict())


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
