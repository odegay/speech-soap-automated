import os
from openai import OpenAI
from dotenv import load_dotenv

from .config import OPENAI_CONFIG

# Initialize the OpenAI client
client = OpenAI(api_key=OPENAI_CONFIG["api_key"])


def generate_text(prompt: str) -> str:
    if not OPENAI_CONFIG["api_key"]:
        raise ValueError("OpenAI API key not configured")
    
    try:
        response = client.chat.completions.create(
            model=OPENAI_CONFIG["model"],
            messages=[{"role": "user", "content": prompt}],
            max_tokens=OPENAI_CONFIG["max_tokens"],
            temperature=0.7
        )
        if not response.choices:
            raise ValueError("No response from OpenAI API")
        return response.choices[0].message.content.strip()
    except Exception as e:
        raise ValueError(f"OpenAI API error: {str(e)}")
