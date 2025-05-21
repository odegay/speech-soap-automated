import importlib
from unittest.mock import patch

import pytest

import os


def reload_client():
    return importlib.reload(importlib.import_module("src.backend.openai_client"))


def test_generate_text_no_api_key(monkeypatch):
    monkeypatch.setenv("OPENAI_API_KEY", "")
    client = reload_client()
    with pytest.raises(ValueError):
        client.generate_text("hi")


def test_generate_text_calls_openai(monkeypatch):
    monkeypatch.setenv("OPENAI_API_KEY", "key")
    client = reload_client()
    mock_resp = {"choices": [{"message": {"content": "result"}}]}
    with patch(
        "src.backend.openai_client.openai.ChatCompletion.create", return_value=mock_resp
    ) as mock_create:
        assert client.generate_text("hi") == "result"
        mock_create.assert_called_once()
