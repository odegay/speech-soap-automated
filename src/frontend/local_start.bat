@echo off
echo Starting Frontend Development Server...

:: Set port for the React application
set PORT=8788

:: Install dependencies if node_modules doesn't exist
if not exist node_modules (
    echo Installing dependencies...
    call npm install
)

:: Start the React application
call npm start 