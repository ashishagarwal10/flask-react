from flask import jsonify, request
from bson import ObjectId
from app.models import Task
from app.api import bp

@bp.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.all()
    return jsonify([task.to_dict() for task in tasks])

@bp.route('/tasks', methods=['POST'])
def create_task():
    data = request.get_json() or {}
    if 'title' not in data:
        return jsonify({'error': 'Missing required field: title'}), 400
    
    task = Task(
        title=data['title'],
        description=data.get('description', '')
    )
    task.save()
    return jsonify(task.to_dict()), 201

@bp.route('/tasks/<task_id>', methods=['GET'])
def get_task(task_id):
    try:
        object_id = ObjectId(task_id)
    except:
        return jsonify({'error': 'Invalid task ID'}), 400
    
    task = Task.get_or_404(object_id)
    return jsonify(task.to_dict())

@bp.route('/tasks/<task_id>', methods=['PUT'])
def update_task(task_id):
    try:
        object_id = ObjectId(task_id)
    except:
        return jsonify({'error': 'Invalid task ID'}), 400
    
    task = Task.get_or_404(object_id)
    data = request.get_json() or {}
    
    if 'title' in data:
        task.title = data['title']
    if 'description' in data:
        task.description = data['description']
    
    task.save()
    return jsonify(task.to_dict())

@bp.route('/tasks/<task_id>', methods=['DELETE'])
def delete_task(task_id):
    try:
        object_id = ObjectId(task_id)
    except:
        return jsonify({'error': 'Invalid task ID'}), 400
        
    task = Task.get_or_404(object_id)
    task.delete()
    return '', 204