@echo off
echo Starting Backend Server...

:: Create and activate virtual environment if it doesn't exist
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

:: Activate virtual environment
call venv\Scripts\activate.bat

:: Install requirements if needed
if not exist "venv\Lib\site-packages\flask" (
    echo Installing requirements...
    pip install -r requirements.txt
)

:: Check if .env file exists
if not exist ".env" (
    echo Warning: .env file not found. Using default configuration.
    echo Please create a .env file with your configuration.
)

:: Add project root to PYTHONPATH
set PYTHONPATH=%PYTHONPATH%;%~dp0..\..

:: Start the Flask application using our app.py directly
python -m src.backend.app 