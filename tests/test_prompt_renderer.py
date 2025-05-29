from src.backend.prompts import render_prompt, TemplateNotFoundError


def test_render_prompt_success():
    inputs = {"patientname": "John", "setting": "clinic"}
    prompt = render_prompt("SUBJECTIVE", "v1", inputs)
    assert "Subjective Note for John" in prompt
    assert "Setting/context: clinic" in prompt


def test_render_prompt_missing():
    try:
        render_prompt("MISSING", "v1", {})
    except TemplateNotFoundError:
        assert True
    else:
        assert False
