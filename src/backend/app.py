import json
from pathlib import Path

from flask import Flask, jsonify, request
from flask_cors import CORS

from .openai_client import generate_text
from .config import SERVER_CONFIG, CORS_CONFIG, DATA_DIR


def load_json(path: Path):
    with open(path) as f:
        return json.load(f)


app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {
        "origins": CORS_CONFIG["origins"],
        "methods": CORS_CONFIG["methods"],
        "allow_headers": CORS_CONFIG["allow_headers"]
    }
})


@app.route("/api/generate", methods=["POST"])
def generate():
    data = request.json or {}
    prompt = data.get("prompt", "")
    try:
        response = generate_text(prompt)
        return jsonify({"text": response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/health")
def health():
    return jsonify({"status": "ok"})


@app.route("/api/options/<name>")
def get_options(name: str):
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
        "transitionNotes": "transition_notes"
    }
    
    # Get the corresponding phrasebank file name
    phrasebank_file = section_mapping.get(section)
    if not phrasebank_file:
        return jsonify({"error": "not found"}), 404
        
    path = DATA_DIR / "phrasebanks" / f"{phrasebank_file}.json"
    if not path.exists():
        return jsonify({"error": "not found"}), 404
    return jsonify(load_json(path))


if __name__ == "__main__":
    app.run(
        host=SERVER_CONFIG["host"],
        port=SERVER_CONFIG["port"],
        debug=SERVER_CONFIG["debug"]
    )
