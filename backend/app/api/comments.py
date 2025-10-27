from flask import jsonify, request
from bson import ObjectId
from app.models import Task, Comment
from app.api import bp

@bp.route('/tasks/<task_id>/comments', methods=['GET'])
def get_comments(task_id):
    try:
        object_id = ObjectId(task_id)
    except:
        return jsonify({'error': 'Invalid task ID'}), 400
        
    task = Task.get_or_404(object_id)
    return jsonify([comment.to_dict() for comment in task.comments])

@bp.route('/tasks/<task_id>/comments', methods=['POST'])
def create_comment(task_id):
    try:
        object_id = ObjectId(task_id)
    except:
        return jsonify({'error': 'Invalid task ID'}), 400
        
    task = Task.get_or_404(object_id)
    data = request.get_json() or {}
    
    if 'content' not in data:
        return jsonify({'error': 'Missing required field: content'}), 400
    
    comment = Comment(
        task_id=task_id,
        content=data['content']
    )
    comment.save()
    return jsonify(comment.to_dict()), 201

@bp.route('/comments/<comment_id>', methods=['GET'])
def get_comment(comment_id):
    try:
        object_id = ObjectId(comment_id)
    except:
        return jsonify({'error': 'Invalid comment ID'}), 400
        
    comment = Comment.get_or_404(object_id)
    return jsonify(comment.to_dict())

@bp.route('/comments/<comment_id>', methods=['PUT'])
def update_comment(comment_id):
    try:
        object_id = ObjectId(comment_id)
    except:
        return jsonify({'error': 'Invalid comment ID'}), 400
        
    comment = Comment.get_or_404(object_id)
    data = request.get_json() or {}
    
    if 'content' not in data:
        return jsonify({'error': 'Missing required field: content'}), 400
    
    comment.content = data['content']
    comment.save()
    return jsonify(comment.to_dict())

@bp.route('/comments/<comment_id>', methods=['DELETE'])
def delete_comment(comment_id):
    try:
        object_id = ObjectId(comment_id)
    except:
        return jsonify({'error': 'Invalid comment ID'}), 400
        
    comment = Comment.get_or_404(object_id)
    comment.delete()
    return '', 204