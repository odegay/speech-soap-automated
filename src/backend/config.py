import os
import logging
from pathlib import Path
from dotenv import load_dotenv

try:
    from google.cloud import secretmanager
except ImportError:  # pragma: no cover - optional dependency
    secretmanager = None

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables from .env file for local development
backend_env = Path(__file__).resolve().parent / ".env"
if backend_env.exists():
    load_dotenv(backend_env)
else:
    # Fallback to root .env
    load_dotenv()


def _load_secret(secret_id: str) -> str:
    """Load a secret from Google Secret Manager if available."""
    if not secretmanager or not os.getenv("GOOGLE_CLOUD_PROJECT"):
        return os.getenv(secret_id, "")  # Fallback to env var
    try:
        client = secretmanager.SecretManagerServiceClient()
        name = f"projects/{os.environ['GOOGLE_CLOUD_PROJECT']}/secrets/{secret_id}/versions/latest"
        response = client.access_secret_version(name=name)
        return response.payload.data.decode("UTF-8")
    except Exception as e:
        logger.error(f"Failed to load secret {secret_id}: {str(e)}")
        return os.getenv(secret_id, "")  # Fallback to env var

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
    "api_key": os.getenv("OPENAI_API_KEY") or _load_secret("speech-soap-generator-openai-token"),
    "model": os.getenv("OPENAI_MODEL", "gpt-3.5-turbo"),
    "max_tokens": int(os.getenv("OPENAI_MAX_TOKENS", "3000")),
}

# CORS configuration
CORS_CONFIG = {
    "origins": os.getenv(
        "CORS_ORIGINS",
        "http://localhost:3000,http://localhost:8788,https://soap-backend-${PROJECT_ID}.us-central1.run.app"
    ).split(","),
    "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    "allow_headers": ["Content-Type", "Authorization"],
    "expose_headers": ["Content-Type", "Authorization"],
    "supports_credentials": True,
    "max_age": 600,
}

# Authentication credentials
AUTH_CREDENTIALS = {
    "username": os.getenv("AUTH_USERNAME", "clinician"),
    "password": os.getenv("AUTH_PASSWORD", "password"),
}

# Logging configuration
LOG_FILE = os.getenv("LOG_FILE", "backend.log")
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

# Validate required configuration
def validate_config():
    """Validate that all required configuration is present."""
    if not OPENAI_CONFIG["api_key"]:
        logger.warning("OpenAI API key is not set")
    
    if not os.path.exists(DATA_DIR):
        logger.warning(f"Data directory {DATA_DIR} does not exist")
        os.makedirs(DATA_DIR, exist_ok=True)

# Run validation
validate_config()
