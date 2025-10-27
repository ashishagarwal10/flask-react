import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-key-please-change'
    MONGODB_URI = os.environ.get('MONGODB_URI') or 'mongodb://localhost:27017'
    MONGODB_DB = os.environ.get('MONGODB_DB') or 'task_management'