@echo off
echo Starting Speech SOAP Application...

:: Start backend in a new window
start "Backend Server" cmd /c "cd src\backend && local_start.bat"

:: Wait a moment for backend to start
timeout /t 5

:: Start frontend in a new window
start "Frontend Server" cmd /c "cd src\frontend && local_start.bat"

echo Application started!
echo Backend running at http://localhost:3000
echo Frontend running at http://localhost:3001
echo.
echo Press any key to close all windows...
pause > nul

:: Close all windows
taskkill /FI "WINDOWTITLE eq Backend Server*" /F
taskkill /FI "WINDOWTITLE eq Frontend Server*" /F 