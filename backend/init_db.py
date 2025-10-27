from pymongo import MongoClient
from config import Config

def init_db():
    # Connect to MongoDB
    client = MongoClient(Config.MONGODB_URI)
    db = client[Config.MONGODB_DB]
    
    # Create collections if they don't exist
    if 'tasks' not in db.list_collection_names():
        db.create_collection('tasks')
    
    if 'comments' not in db.list_collection_names():
        db.create_collection('comments')
    
    print("Database initialized successfully!")

if __name__ == '__main__':
    init_db()