import json

from src.backend.app import app


def test_get_sections():
    client = app.test_client()
    resp = client.get("/api/sections")
    assert resp.status_code == 200
    data = resp.get_json()
    assert isinstance(data, list)
    assert any(s["code"] == "SUBJECTIVE" for s in data)


def test_get_options():
    client = app.test_client()
    resp = client.get("/api/options/dispositions")
    assert resp.status_code == 200
    data = resp.get_json()
    assert "Engaged" in data


def test_get_config():
    client = app.test_client()
    resp = client.get("/api/config/SUBJECTIVE")
    assert resp.status_code == 200
    data = resp.get_json()
    assert any(f["id"] == "disposition" for f in data)


def test_get_phrasebank():
    client = app.test_client()
    resp = client.get("/api/phrasebank/SUBJECTIVE")
    assert resp.status_code == 200
    data = resp.get_json()
    assert isinstance(data, list)
    assert len(data) > 0
