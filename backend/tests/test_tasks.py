import pytest
from app.models import Task

@pytest.fixture
def task(app):
    with app.app_context():
        task = Task(title='Test Task', description='Test Description')
        task.save()
        return task

def test_create_task(client):
    response = client.post('/api/tasks', json={
        'title': 'New Task',
        'description': 'New Description'
    })
    assert response.status_code == 201
    data = response.get_json()
    assert data['title'] == 'New Task'
    assert data['description'] == 'New Description'

def test_get_tasks(client, task):
    response = client.get('/api/tasks')
    assert response.status_code == 200
    data = response.get_json()
    assert len(data) == 1
    assert data[0]['title'] == task.title

def test_update_task(client, task):
    response = client.put(f'/api/tasks/{str(task.id)}', json={
        'title': 'Updated Task'
    })
    assert response.status_code == 200
    data = response.get_json()
    assert data['title'] == 'Updated Task'

    def test_delete_task(client, task):
        task_id = str(task.id)
        response = client.delete(f'/api/tasks/{task_id}')
        assert response.status_code == 204
        response = client.get(f'/api/tasks/{task_id}')
        assert response.status_code == 404  # Should return 404 for a deleted taskdef test_invalid_task_id(client):
    response = client.get('/api/tasks/invalid-id')
    assert response.status_code == 400
    data = response.get_json()
    assert 'error' in data