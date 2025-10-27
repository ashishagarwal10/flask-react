# Enhanced Task Management Application

A modern full-stack task management application built with React frontend and Flask backend, featuring enhanced user experience and modern architecture.

## Features

### Core Features
- Create, read, update, and delete tasks
- Add, edit, and delete comments on tasks
- RESTful API integration
- Comprehensive test coverage

### Enhanced Features
- 3D Task Cards using Three.js
- Dark/Light mode theme support
- MongoDB database for better scalability
- Modern Material-UI components
- Fully responsive design
- Improved error handling
- Performance optimizations

## Setup

### Frontend

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm start
```

The application will be available at http://localhost:3000

### Backend

1. Set up Python virtual environment and install dependencies (see backend/README.md)
2. Start the Flask server (runs on http://localhost:5000)

## Project Structure

### Frontend

```
frontend/
├── src/
│   ├── api/          # API integration
│   ├── components/   # React components
│   ├── App.js        # Main application component
│   └── index.js      # Application entry point
└── package.json
```

### Backend

```
backend/
├── app/             # Flask application
│   ├── api/         # API routes
│   └── models.py    # Database models
├── tests/           # Automated tests
└── README.md        # Backend setup instructions
```

## Assumptions

1. Backend API is running on http://localhost:5000
2. CORS is enabled on the backend
3. Database is SQLite for simplicity
4. No authentication required for this demo
5. Material-UI for consistent styling
6. Tasks and comments are loaded on demand to optimize performance