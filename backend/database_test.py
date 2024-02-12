import pytest
import motor.motor_asyncio
import os
from dotenv import load_dotenv

load_dotenv("env/.env_file")

@pytest.mark.asyncio
async def test_db_connection():
    client = motor.motor_asyncio.AsyncIOMotorClient(os.getenv("DB_URL"))
    database = client.notes_db
    collection = database.notes

    # Try to fetch some documents from your collection
    documents = await collection.find().to_list(length=10)

    # If the operation is successful, it means you've successfully connected to your MongoDB Atlas cluster
    assert documents is not None

@pytest.mark.asyncio
async def test_db_connection():
    expected_db_url = "mongodb+srv://coolchigi:react-docker-2024@react-docker.mhu4cd4.mongodb.net/"  # Replace with your expected DB_URL
    db_url = os.getenv("DB_URL")

    assert db_url == expected_db_url, f"DB_URL is {db_url}, but expected {expected_db_url}"

    client = motor.motor_asyncio.AsyncIOMotorClient(db_url)
    database = client.notes_db
    collection = database.notes
