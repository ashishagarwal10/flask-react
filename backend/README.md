# Backend - Flask Task and Comment API

This is a Flask-based REST API that provides endpoints for managing tasks and their comments.

## Features

- CRUD operations for Tasks
- CRUD operations for Comments
- Automated tests for all endpoints
- SQLite database (configurable)
- CORS enabled
- Database migrations support

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
venv\Scripts\activate  # Windows
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Initialize the database:
```bash
flask db upgrade
```

4. Run the development server:
```bash
python run.py
```

## API Endpoints

### Tasks

- `GET /api/tasks` - List all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/<id>` - Get a specific task
- `PUT /api/tasks/<id>` - Update a task
- `DELETE /api/tasks/<id>` - Delete a task

### Comments

- `GET /api/tasks/<task_id>/comments` - List all comments for a task
- `POST /api/tasks/<task_id>/comments` - Create a new comment for a task
- `GET /api/comments/<id>` - Get a specific comment
- `PUT /api/comments/<id>` - Update a comment
- `DELETE /api/comments/<id>` - Delete a comment

## Running Tests

```bash
pytest
```

## Assumptions

1. Tasks require a title but description is optional
2. Comments require content and must be associated with a task
3. Deleting a task will delete all associated comments
4. All dates are stored in UTC
5. Frontend will handle pagination if needed