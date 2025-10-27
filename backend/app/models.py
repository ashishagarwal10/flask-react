from datetime import datetime, UTC
from bson import ObjectId
from flask import current_app, abort
from pymongo import MongoClient

def get_db():
    client = MongoClient(current_app.config['MONGODB_URI'])
    return client[current_app.config['MONGODB_DB']]

class Task:
    collection_name = 'tasks'

    def __init__(self, title, description=None, id=None, created_at=None, updated_at=None):
        self.id = str(id) if id else None
        self.title = title
        self.description = description
        self.created_at = created_at or datetime.now(UTC)
        self.updated_at = updated_at or datetime.now(UTC)

    @staticmethod
    def get_collection():
        return get_db()[Task.collection_name]
    
    @staticmethod
    def get_or_404(id):
        task_data = Task.get_collection().find_one({'_id': ObjectId(id)})
        if task_data is None:
            abort(404)
        task_data['id'] = str(task_data.pop('_id'))
        return Task(**task_data)

    @classmethod
    def all(cls):
        collection = cls.get_collection()
        tasks = []
        for task in collection.find():
            task['id'] = str(task.pop('_id'))
            tasks.append(cls(**task))
        return tasks

    @property
    def comments(self):
        return Comment.get_by_task_id(self.id)

    def save(self):
        collection = self.get_collection()
        task_data = {
            'title': self.title,
            'description': self.description,
            'created_at': self.created_at,
            'updated_at': datetime.now(UTC)
        }
        if self.id:
            collection.update_one({'_id': ObjectId(self.id)}, {'$set': task_data})
        else:
            result = collection.insert_one(task_data)
            self.id = str(result.inserted_id)
        return self

    def delete(self):
        if self.id:
            self.get_collection().delete_one({'_id': ObjectId(self.id)})
            # Also delete associated comments
            Comment.delete_by_task_id(self.id)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'comments': [comment.to_dict() for comment in self.comments]
        }

    def save(self):
        collection = self.get_collection()
        task_data = {
            'title': self.title,
            'description': self.description,
            'created_at': self.created_at,
            'updated_at': datetime.now(UTC)
        }
        
        if self.id:
            collection.update_one(
                {'_id': ObjectId(self.id)},
                {'$set': task_data}
            )
        else:
            result = collection.insert_one(task_data)
            self.id = str(result.inserted_id)
        
        return self

    @staticmethod
    def get_all():
        collection = Task.get_collection()
        tasks = []
        for task in collection.find():
            task['id'] = str(task.pop('_id'))
            tasks.append(Task(**task))
        return tasks

    @staticmethod
    def get_by_id(id):
        collection = Task.get_collection()
        task = collection.find_one({'_id': ObjectId(id)})
        if task:
            task['id'] = str(task.pop('_id'))
            return Task(**task)
        return None

    def delete(self):
        if self.id:
            collection = self.get_collection()
            collection.delete_one({'_id': ObjectId(self.id)})

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'comments': [comment.to_dict() for comment in Comment.get_by_task_id(self.id)]
        }

class Comment:
    collection_name = 'comments'

    def __init__(self, content, task_id, id=None, created_at=None, updated_at=None):
        self.id = str(id) if id else None
        self.content = content
        self.task_id = str(task_id)
        self.created_at = created_at or datetime.now(UTC)
        self.updated_at = updated_at or datetime.now(UTC)

    @staticmethod
    def get_collection():
        return get_db()[Comment.collection_name]

    @staticmethod
    def get_or_404(id):
        comment_data = Comment.get_collection().find_one({'_id': ObjectId(id)})
        if comment_data is None:
            abort(404)
        comment_data['id'] = str(comment_data.pop('_id'))
        return Comment(**comment_data)

    def save(self):
        collection = self.get_collection()
        comment_data = {
            'content': self.content,
            'task_id': self.task_id,
            'created_at': self.created_at,
            'updated_at': datetime.now(UTC)
        }
        
        if self.id:
            collection.update_one(
                {'_id': ObjectId(self.id)},
                {'$set': comment_data}
            )
        else:
            result = collection.insert_one(comment_data)
            self.id = str(result.inserted_id)
        
        return self

    @staticmethod
    def get_by_task_id(task_id):
        collection = Comment.get_collection()
        comments = []
        for comment in collection.find({'task_id': str(task_id)}):
            comment['id'] = str(comment.pop('_id'))
            comments.append(Comment(**comment))
        return comments

    @staticmethod
    def get_by_id(id):
        collection = Comment.get_collection()
        comment = collection.find_one({'_id': ObjectId(id)})
        if comment:
            comment['id'] = str(comment.pop('_id'))
            return Comment(**comment)
        return None

    def delete(self):
        if self.id:
            collection = self.get_collection()
            collection.delete_one({'_id': ObjectId(self.id)})

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'task_id': self.task_id,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }