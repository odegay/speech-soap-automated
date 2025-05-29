from pathlib import Path
from string import Template
import logging

logger = logging.getLogger(__name__)

PROMPTS_DIR = Path(__file__).resolve().parent / "templates"


class TemplateNotFoundError(FileNotFoundError):
    """Raised when a prompt template cannot be found."""


def validate_template_variables(template_text: str, inputs: dict) -> None:
    """Validate that all required template variables are present in inputs."""
    template = Template(template_text)
    required_vars = set()
    
    # Extract required variables from template
    for match in template.pattern.finditer(template_text):
        if match.group('named'):
            required_vars.add(match.group('named'))
    
    # Check for missing variables
    missing_vars = required_vars - set(inputs.keys())
    if missing_vars:
        raise KeyError(f"Missing required template variables: {', '.join(missing_vars)}")


def get_default_value(var_name: str) -> str:
    """Get default value for a template variable."""
    defaults = {
        'patientname': 'the patient'
    }
    return defaults.get(var_name, '')


def render_prompt(section: str, version: str, inputs: dict) -> str:
    """Render a prompt for the given section and schema version."""
    template_path = PROMPTS_DIR / f"{section}_{version}.txt"
    if not template_path.exists():
        raise TemplateNotFoundError(f"Template {template_path.name} not found")
    
    template_text = template_path.read_text()
    validate_template_variables(template_text, inputs)
    
    try:
        # Prepare inputs with default values
        processed_inputs = {}
        for key, value in inputs.items():
            processed_inputs[key] = value if value else get_default_value(key)
        
        template = Template(template_text)
        return template.safe_substitute(processed_inputs)
    except KeyError as e:
        logger.error(f"Template variable error: {str(e)}")
        raise KeyError(f"Error processing template variables: {str(e)}")
    except Exception as e:
        logger.error(f"Unexpected error rendering prompt: {str(e)}")
        raise
