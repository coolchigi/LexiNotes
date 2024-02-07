import motor.motor_asyncio
from model import Note

client = motor.motor_asyncio.AsyncIOMotorClient("MONGODB ATLAS ENV HERE")
database = client.notes_db
collection = database.notes