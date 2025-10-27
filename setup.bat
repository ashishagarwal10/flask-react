@echo off
echo ===================================
echo Task Management Application Setup
echo ===================================

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

REM Store the root directory
set ROOT_DIR=%~dp0
cd %ROOT_DIR%

echo.
echo Setting up Python virtual environment...
if not exist .venv (
    python -m venv .venv
) else (
    echo Virtual environment already exists
)

REM Activate virtual environment
call .venv\Scripts\activate

echo.
echo Installing backend dependencies...
cd backend
pip install -r requirements.txt

echo.
echo Initializing database...
set FLASK_APP=app
set FLASK_ENV=development
python -c "from app import create_app, db; from app.models import Task, Comment; app = create_app(); app.app_context().push(); db.create_all()"

echo.
echo Installing frontend dependencies...
cd ..\frontend
call npm install

echo.
echo Setup complete! To start the application:
echo 1. Run 'start_backend.bat' in one terminal
echo 2. Run 'start_frontend.bat' in another terminal