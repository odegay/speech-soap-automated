@echo off
echo Starting Frontend Development Server...

:: Set environment variables
set REACT_APP_API_BASE_URL=http://localhost:3000
set REACT_APP_AUTH_USERNAME=clinician
set REACT_APP_AUTH_PASSWORD=password

:: Install dependencies if node_modules doesn't exist
if not exist node_modules (
    echo Installing dependencies...
    call npm install
)

:: Start the React application
call npm start 