import json
import logging
import os
import re
from pathlib import Path

try:
    from google.cloud import logging as cloud_logging
except ImportError:  # pragma: no cover - optional dependency
    cloud_logging = None

from flask import Flask, jsonify, request, make_response
from flask_cors import CORS

from .openai_client import generate_text
from .config import (
    SERVER_CONFIG,
    CORS_CONFIG,
    DATA_DIR,
    AUTH_CREDENTIALS,
    LOG_FILE,
    LOG_LEVEL,
)
from .prompts import render_prompt, TemplateNotFoundError, PROMPTS_DIR
from .formatting import format_text
from .version import get_version_info


# Configure logging
logging.basicConfig(
    level=LOG_LEVEL,
    format="%(asctime)s %(levelname)s:%(name)s:%(message)s",
    handlers=[logging.FileHandler(LOG_FILE), logging.StreamHandler()],
)

if cloud_logging and os.getenv("GOOGLE_CLOUD_PROJECT"):
    try:  # pragma: no cover - optional dependency
        cloud_logging.Client().setup_logging()
    except Exception:
        pass

logger = logging.getLogger(__name__)


def load_json(path: Path):
    with open(path) as f:
        return json.load(f)


app = Flask(__name__)

# Enable CORS for all routes
CORS(app, 
     resources={r"/api/*": {
         "origins": CORS_CONFIG["origins"],
         "methods": CORS_CONFIG["methods"],
         "allow_headers": CORS_CONFIG["allow_headers"],
         "expose_headers": CORS_CONFIG["expose_headers"],
         "supports_credentials": CORS_CONFIG["supports_credentials"],
         "max_age": CORS_CONFIG["max_age"]
     }},
     supports_credentials=True)

# Log CORS configuration on startup
logger.info("CORS Configuration: %s", CORS_CONFIG)

@app.after_request
def after_request(response):
    origin = request.headers.get('Origin')
    if origin in CORS_CONFIG["origins"]:
        response.headers.add('Access-Control-Allow-Origin', origin)
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

@app.before_request
def log_request_info():
    logger.info("%s %s", request.method, request.path)
    logger.info("Origin: %s", request.headers.get('Origin'))
    logger.info("Headers: %s", dict(request.headers))

VALID_NAME = re.compile(r"^[A-Za-z0-9_]+$")


def is_valid_name(name: str) -> bool:
    return bool(VALID_NAME.match(name))


@app.route("/api/generate", methods=["POST"])
def generate():
    data = request.json or {}
    section = data.get("section")
    version = data.get("schema_version", "v1")
    inputs = data.get("inputs", {})

    if not section or not isinstance(inputs, dict):
        return jsonify({"error": "Invalid request: missing section or inputs"}), 400

    try:
        prompt = render_prompt(section, version, inputs)
    except TemplateNotFoundError as e:
        logger.error(f"Template not found: {str(e)}")
        return jsonify({"error": str(e)}), 400
    except KeyError as e:
        logger.error(f"Missing required input: {str(e)}")
        return jsonify({"error": f"Missing required input: {str(e)}"}), 400

    try:
        raw_text = generate_text(prompt)
        formatted = format_text(section, raw_text)
        return jsonify({"text": formatted})
    except ValueError as e:
        logger.error(f"OpenAI API error: {str(e)}")
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return jsonify({"error": "An unexpected error occurred"}), 500


@app.route("/api/health")
def health():
    return jsonify({"status": "ok"})


@app.route("/api/login", methods=["POST"])
def login():
    data = request.json or {}
    username = data.get("username")
    password = data.get("password")
    if (
        username == AUTH_CREDENTIALS["username"]
        and password == AUTH_CREDENTIALS["password"]
    ):
        return jsonify({"status": "ok"})
    return jsonify({"error": "Invalid credentials"}), 401


@app.route("/api/options/<name>")
def get_options(name: str):
    if not is_valid_name(name):
        return jsonify({"error": "invalid name"}), 400
    path = DATA_DIR / "options" / f"{name}.json"
    if not path.exists():
        return jsonify({"error": "not found"}), 404
    return jsonify(load_json(path))


@app.route("/api/sections")
def get_sections():
    path = DATA_DIR / "sections.json"
    return jsonify(load_json(path))


@app.route("/api/config/<section>")
def get_config(section: str):
    if not is_valid_name(section):
        return jsonify({"error": "invalid section"}), 400
    path = DATA_DIR / "configs" / f"{section}.json"
    if not path.exists():
        return jsonify({"error": "not found"}), 404
    return jsonify(load_json(path))


@app.route("/api/phrasebank/<section>")
def get_phrasebank(section: str):
    # Map section names to their corresponding phrasebank files
    section_mapping = {
        "communication": "communication_examples",
        "difficulties": "noted_difficulties",
        "observations": "unique_observations",
        "transitionNotes": "transition_notes",
    }

    logger.info(f"Loading phrasebank for section: {section}")
    
    # Get the corresponding phrasebank file name
    if not is_valid_name(section):
        logger.error(f"Invalid section name: {section}")
        return jsonify({"error": "invalid section"}), 400

    phrasebank_file = section_mapping.get(section)
    if not phrasebank_file:
        logger.error(f"No mapping found for section: {section}")
        return jsonify({"error": "not found"}), 404

    path = DATA_DIR / "phrasebanks" / f"{phrasebank_file}.json"
    logger.info(f"Loading phrasebank from: {path}")
    
    if not path.exists():
        logger.error(f"Phrasebank file not found: {path}")
        return jsonify({"error": "not found"}), 404
        
    try:
        data = load_json(path)
        logger.info(f"Successfully loaded {len(data)} phrases for section {section}")
        return jsonify(data)
    except Exception as e:
        logger.error(f"Error loading phrasebank: {str(e)}")
        return jsonify({"error": "Error loading phrasebank"}), 500


@app.route("/api/templates")
def list_templates():
    templates = []
    for p in PROMPTS_DIR.glob("*_*.txt"):
        section, version = p.stem.split("_", 1)
        templates.append({"section": section, "version": version})
    return jsonify(templates)


@app.route("/api/templates/<section>/<version>")
def get_template(section: str, version: str):
    if not is_valid_name(section) or not is_valid_name(version):
        return jsonify({"error": "invalid name"}), 400
    path = PROMPTS_DIR / f"{section}_{version}.txt"
    if not path.exists():
        return jsonify({"error": "not found"}), 404
    return jsonify({"template": path.read_text()})


@app.errorhandler(Exception)
def handle_exception(e):
    from werkzeug.exceptions import HTTPException

    if isinstance(e, HTTPException):
        return jsonify({"error": e.description}), e.code
    logger.error(f"Unhandled error: {e}")
    return jsonify({"error": "Internal server error"}), 500


@app.route("/api/version")
def version():
    return jsonify(get_version_info())


if __name__ == "__main__":
    app.run(
        host=SERVER_CONFIG["host"],
        port=SERVER_CONFIG["port"],
        debug=SERVER_CONFIG["debug"],
    )
