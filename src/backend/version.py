"""
Version information for the Speech SOAP Notes Automation backend.
"""

VERSION = "0.1.0"
BUILD_DATE = "2024-05-26"
API_VERSION = "v1"

def get_version_info():
    """Get the complete version information."""
    from .config import OPENAI_CONFIG
    return {
        "version": VERSION,
        "build_date": BUILD_DATE,
        "api_version": API_VERSION,
        "openai_model": OPENAI_CONFIG["model"]
    } 