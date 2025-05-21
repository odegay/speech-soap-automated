import os

import openai
from dotenv import load_dotenv

# Load the default environment file first and override with local
# settings when available. This allows developers to keep local-only
# configuration in `.env.local` which is ignored by git.
load_dotenv()
load_dotenv(".env.local", override=True)

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
openai.api_key = OPENAI_API_KEY


def generate_text(prompt: str) -> str:
    if not OPENAI_API_KEY:
        raise ValueError("OpenAI API key not configured")
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=100,
    )
    return response.choices[0].message["content"].strip()
