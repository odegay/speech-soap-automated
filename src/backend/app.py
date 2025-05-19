from flask import Flask, jsonify, request

from .openai_client import generate_text

app = Flask(__name__)


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


if __name__ == "__main__":
    app.run(debug=True)
