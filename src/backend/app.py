import json
from pathlib import Path

from flask import Flask, jsonify, request
from flask_cors import CORS

from .openai_client import generate_text
from .config import SERVER_CONFIG, CORS_CONFIG, DATA_DIR
from .prompts import render_prompt, TemplateNotFoundError
from .formatting import format_text


def load_json(path: Path):
    with open(path) as f:
        return json.load(f)


app = Flask(__name__)
CORS(
    app,
    resources={
        r"/api/*": {
            "origins": CORS_CONFIG["origins"],
            "methods": CORS_CONFIG["methods"],
            "allow_headers": CORS_CONFIG["allow_headers"],
        }
    },
)


@app.route("/api/generate", methods=["POST"])
def generate():
    data = request.json or {}
    section = data.get("section")
    version = data.get("schema_version", "v1")
    inputs = data.get("inputs", {})

    if not section or not isinstance(inputs, dict):
        return jsonify({"error": "invalid request"}), 400

    try:
        prompt = render_prompt(section, version, inputs)
    except TemplateNotFoundError as e:
        return jsonify({"error": str(e)}), 400

    try:
        raw_text = generate_text(prompt)
        formatted = format_text(section, raw_text)
        return jsonify({"text": formatted})
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
        "transitionNotes": "transition_notes",
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
        debug=SERVER_CONFIG["debug"],
    )
