@echo off
setlocal enabledelayedexpansion

:: Parse command line argument
set RECREATE_VENV=0
if "%1"=="-1" set RECREATE_VENV=1

echo Setting up test environment...

:: Handle virtual environment
if %RECREATE_VENV%==1 (
    echo Recreating virtual environment...
    if exist myenv (
        rmdir /s /q myenv
    )
    python -m venv myenv
) else (
    if not exist myenv (
        echo Virtual environment not found. Creating one...
        python -m venv myenv
    )
)

:: Activate virtual environment
call myenv\Scripts\activate.bat

:: Install/upgrade requirements
echo Installing dependencies...
python -m pip install --upgrade pip
pip install -r src/backend/requirements.txt

:: Set test environment variables
set FLASK_APP=src.backend.app
set FLASK_ENV=testing
set FLASK_DEBUG=1
set OPENAI_API_KEY=your_test_key_here
set GOOGLE_CLOUD_PROJECT=test-project

:: Run the tests
echo Running tests...
pytest tests/ -v --cov=src

:: Deactivate virtual environment
call myenv\Scripts\deactivate.bat

endlocal 