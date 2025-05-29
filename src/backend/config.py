import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env file
# First try to load from src/backend/.env
backend_env = Path(__file__).resolve().parent / ".env"
if backend_env.exists():
    load_dotenv(backend_env)
else:
    # Fallback to root .env
    load_dotenv()

# Base directory
BASE_DIR = Path(__file__).resolve().parent

# Data directory
DATA_DIR = BASE_DIR / "data"

# Server configuration
SERVER_CONFIG = {
    "host": os.getenv("FLASK_HOST", "127.0.0.1"),
    "port": int(os.getenv("FLASK_PORT", "3000")),
    "debug": os.getenv("FLASK_DEBUG", "True").lower() == "true",
}

# OpenAI configuration
OPENAI_CONFIG = {
    "api_key": os.getenv("OPENAI_API_KEY", ""),
    "model": os.getenv("OPENAI_MODEL", "gpt-3.5-turbo"),
    "max_tokens": int(os.getenv("OPENAI_MAX_TOKENS", "3000")),
}

# CORS configuration
CORS_CONFIG = {
    "origins": os.getenv(
        "CORS_ORIGINS", "http://localhost:3000,http://localhost:8788"
    ).split(","),
    "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    "allow_headers": ["Content-Type", "Authorization"],
}

# Authentication credentials
AUTH_CREDENTIALS = {
    "username": os.getenv("AUTH_USERNAME", "clinician"),
    "password": os.getenv("AUTH_PASSWORD", "password"),
}

# Logging configuration
LOG_FILE = os.getenv("LOG_FILE", "backend.log")
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
