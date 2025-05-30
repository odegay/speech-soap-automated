@echo off
echo Starting local validation...

:: Create and activate virtual environment if it doesn't exist
if not exist myenv (
    echo Creating virtual environment...
    python -m venv myenv
)
call myenv\Scripts\activate.bat

:: Install backend dependencies
echo Installing backend dependencies...
pip install -r src/backend/requirements.txt

:: Run backend tests
echo Running backend tests...
pytest tests/ -v --cov=src

:: Check if backend tests passed
if %ERRORLEVEL% NEQ 0 (
    echo Backend tests failed!
    exit /b %ERRORLEVEL%
)

:: Install frontend dependencies
echo Installing frontend dependencies...
cd src/frontend
call npm ci

:: Run frontend tests
echo Running frontend tests...
call npm test -- --watchAll=false --passWithNoTests

:: Check if frontend tests passed
if %ERRORLEVEL% NEQ 0 (
    echo Frontend tests failed!
    exit /b %ERRORLEVEL%
)

:: Build frontend
echo Building frontend...
call npm run build

:: Return to root directory
cd ..\..

:: Start the application
echo Starting application...
start "Backend Server" cmd /c "cd src\backend && local_start.bat"

:: Wait for backend to start
timeout /t 5

:: Test backend health endpoint
echo Testing backend health endpoint...
curl -s http://localhost:3000/api/health
if %ERRORLEVEL% NEQ 0 (
    echo Backend health check failed!
    exit /b %ERRORLEVEL%
)

:: Start frontend
echo Starting frontend...
start "Frontend Server" cmd /c "cd src\frontend && local_start.bat"

echo.
echo Validation complete! Application is running:
echo Backend: http://localhost:3000
echo Frontend: http://localhost:3001
echo.
echo Press any key to stop the application...
pause > nul

:: Cleanup
taskkill /FI "WINDOWTITLE eq Backend Server*" /F
taskkill /FI "WINDOWTITLE eq Frontend Server*" /F
call myenv\Scripts\deactivate.bat 