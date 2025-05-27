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

:: Set environment variables
set FLASK_APP=app.py
set FLASK_ENV=development
set FLASK_DEBUG=True
set FLASK_HOST=0.0.0.0
set FLASK_PORT=3000
set OPENAI_API_KEY=your_api_key_here
set CORS_ORIGINS=http://localhost:8788

:: Start the Flask application
python -m flask run --host=%FLASK_HOST% --port=%FLASK_PORT% 