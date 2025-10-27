import pytest
import mongomock
from pymongo import MongoClient
from app import create_app
from config import Config
from app.models import get_db

class TestConfig(Config):
    TESTING = True
    MONGODB_URI = 'mongodb://localhost'
    MONGODB_DB = 'test_db'

@pytest.fixture(autouse=True)
def mongodb_client(monkeypatch):
    """Replace the MongoDB client with a mock client for testing"""
    mock_client = mongomock.MongoClient()
    def mock_get_db():
        return mock_client[TestConfig.MONGODB_DB]
    monkeypatch.setattr("app.models.get_db", mock_get_db)
    return mock_client

@pytest.fixture
def app():
    app = create_app(TestConfig)
    with app.app_context():
        yield app

@pytest.fixture
def client(app):
    return app.test_client()