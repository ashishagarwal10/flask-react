@echo off
echo ===================================
echo Task Management Application Restart
echo ===================================

REM Store the root directory
set ROOT_DIR=%~dp0
cd %ROOT_DIR%

REM Kill existing processes
echo Stopping existing processes...
taskkill /F /IM "node.exe" 2>nul
taskkill /F /IM "python.exe" 2>nul

REM Check if Python is installed
python --version 2>nul
if %errorlevel% neq 0 (
    echo Error: Python is not installed or not in PATH
    exit /b 1
)

REM Check if Node.js is installed
node --version 2>nul
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH
    exit /b 1
)

echo.
echo Setting up Python virtual environment...
if not exist .venv (
    echo Creating new virtual environment...
    python -m venv .venv
) else (
    echo Using existing virtual environment...
)

call .venv\Scripts\activate.bat
echo Installing/Updating Python dependencies...
cd backend
pip install -r requirements.txt

echo.
echo Initializing database...
set FLASK_APP=app
set FLASK_ENV=development
python -c "from app import create_app, db; from app.models import Task, Comment; app = create_app(); app.app_context().push(); db.drop_all(); db.create_all(); print('Database initialized successfully!')"

echo.
echo Starting Flask backend server...
start cmd /k "..\\.venv\Scripts\python.exe run.py"

echo.
echo Installing frontend dependencies...
cd ..\frontend
call npm install

echo.
echo Starting backend and frontend servers...
cd ..\backend
start cmd /k "..\\.venv\Scripts\python.exe run.py"

echo Waiting for backend server to be ready...
:CHECK_BACKEND
timeout /t 2 /nobreak > nul
curl -s http://localhost:5000/api/health >nul 2>&1
if %errorlevel% neq 0 (
    echo Backend not ready yet, waiting...
    goto CHECK_BACKEND
)
echo Backend server is running!

cd ..\frontend
echo Starting frontend server...
start cmd /k "npm start"

echo.
echo Application is starting up:
echo - Backend: http://localhost:5000
echo - Frontend: http://localhost:3000
echo.