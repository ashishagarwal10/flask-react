@echo off
echo Starting Backend Server...

REM Store the root directory
set ROOT_DIR=%~dp0
cd %ROOT_DIR%

REM Set Flask environment variables
set FLASK_APP=app
set FLASK_ENV=development

REM Activate virtual environment and start server
call .venv\Scripts\activate
cd backend
python run.py