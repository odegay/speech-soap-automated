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


def test_generate_endpoint_success(monkeypatch):
    client = app.test_client()
    data = {
        "section": "SUBJECTIVE",
        "schema_version": "v1",
        "inputs": {"patientname": "John"},
    }
    monkeypatch.setattr("src.backend.app.generate_text", lambda prompt: "Result")
    resp = client.post("/api/generate", json=data)
    assert resp.status_code == 200
    assert "text" in resp.get_json()


def test_generate_endpoint_bad_request():
    client = app.test_client()
    resp = client.post("/api/generate", json={"foo": "bar"})
    assert resp.status_code == 400


def test_generate_endpoint_error(monkeypatch):
    client = app.test_client()
    data = {"section": "SUBJECTIVE", "schema_version": "v1", "inputs": {}}

    def raise_error(prompt):
        raise Exception("fail")

    monkeypatch.setattr("src.backend.app.generate_text", raise_error)
    resp = client.post("/api/generate", json=data)
    assert resp.status_code == 500
