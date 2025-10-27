@echo off
echo Starting Frontend Server...

REM Store the root directory
set ROOT_DIR=%~dp0
cd %ROOT_DIR%frontend

REM Check if node_modules exists
if not exist node_modules (
    echo Installing dependencies...
    call npm install
)

echo Starting development server...
npm start