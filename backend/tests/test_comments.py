import pytest
from app.models import Task, Comment

@pytest.fixture
def task(app):
    with app.app_context():
        task = Task(title='Test Task', description='Test Description')
        task.save()
        return task

@pytest.fixture
def comment(app, task):
    with app.app_context():
        comment = Comment(content='Test Comment', task_id=task.id)
        comment.save()
        return comment

def test_create_comment(client, task):
    response = client.post(f'/api/tasks/{str(task.id)}/comments', json={
        'content': 'New Comment'
    })
    assert response.status_code == 201
    data = response.get_json()
    assert data['content'] == 'New Comment'
    assert data['task_id'] == str(task.id)

def test_get_task_comments(client, task, comment):
    response = client.get(f'/api/tasks/{str(task.id)}/comments')
    assert response.status_code == 200
    data = response.get_json()
    assert len(data) == 1
    assert data[0]['content'] == comment.content

def test_update_comment(client, comment):
    response = client.put(f'/api/comments/{str(comment.id)}', json={
        'content': 'Updated Comment'
    })
    assert response.status_code == 200
    data = response.get_json()
    assert data['content'] == 'Updated Comment'

def test_delete_comment(client, comment):
    comment_id = str(comment.id)
    response = client.delete(f'/api/comments/{comment_id}')
    assert response.status_code == 204
    response = client.get(f'/api/comments/{comment_id}')
    assert response.status_code == 404  # Should return 404 for a deleted comment

def test_create_comment_missing_content(client, task):
    response = client.post(f'/api/tasks/{str(task.id)}/comments', json={})
    assert response.status_code == 400
    data = response.get_json()
    assert 'error' in data

def test_create_comment_invalid_task(client):
    response = client.post('/api/tasks/invalid-id/comments', json={
        'content': 'New Comment'
    })
    assert response.status_code == 400
    data = response.get_json()
    assert 'error' in data

def test_invalid_comment_id(client):
    response = client.get('/api/comments/invalid-id')
    assert response.status_code == 400
    data = response.get_json()
    assert 'error' in data