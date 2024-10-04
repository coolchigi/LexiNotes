import os
from dotenv import load_dotenv
from pymongo import MongoClient, ASCENDING


# Load config from a .env file:
load_dotenv()
MONGODB_URI = os.environ['MONGODB_URI']
# Connect to your MongoDB cluster:
client = MongoClient(MONGODB_URI)
db = client.NotesDB
db2 = client.ColourDB

def setup_database():
    # Set up notes collection
    notes = db.notes
    notes.create_index([("title", ASCENDING)])
    notes.create_index([("tags", ASCENDING)])
    notes.create_index([("category", ASCENDING)])
    notes.create_index([("created_at", ASCENDING)])

    # Set up color_palettes collection
    color_palettes = db2.color_palettes
    color_palettes.create_index([("user_id", ASCENDING)])
    color_palettes.create_index([("name", ASCENDING)])

    print("Database setup completed successfully!")

if __name__ == "__main__":
    setup_database()