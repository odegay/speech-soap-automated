import importlib
from unittest.mock import patch

import pytest

import os

from src.backend.openai_client import generate_text, client


def reload_client():
    return importlib.reload(importlib.import_module("src.backend.openai_client"))


def test_generate_text_calls_openai():
    mock_resp = type('Response', (), {
        'choices': [type('Choice', (), {
            'message': type('Message', (), {'content': 'result'})()
        })()]
    })()
    
    # Mock both the config and the client
    with patch("src.backend.openai_client.OPENAI_CONFIG", {"api_key": "fake-key", "model": "gpt-3.5-turbo", "max_tokens": 1000}), \
         patch.object(client.chat.completions, 'create', return_value=mock_resp) as mock_create:
        result = generate_text("test prompt")
        assert result == "result"
        mock_create.assert_called_once()
