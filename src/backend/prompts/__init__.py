from pathlib import Path
from string import Template

PROMPTS_DIR = Path(__file__).resolve().parent / "templates"


class TemplateNotFoundError(FileNotFoundError):
    """Raised when a prompt template cannot be found."""


def render_prompt(section: str, version: str, inputs: dict) -> str:
    """Render a prompt for the given section and schema version."""
    template_path = PROMPTS_DIR / f"{section}_{version}.txt"
    if not template_path.exists():
        raise TemplateNotFoundError(f"Template {template_path.name} not found")
    template = Template(template_path.read_text())
    return template.safe_substitute(inputs)
