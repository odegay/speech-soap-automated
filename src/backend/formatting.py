"""Simple formatting utilities for generated text."""


def format_text(section: str, text: str) -> str:
    """Apply basic formatting based on section."""
    cleaned = text.strip()
    # For now we just ensure each line starts with a bullet for subjective section
    if section.upper() == "SUBJECTIVE":
        lines = [f"- {line.strip()}" for line in cleaned.splitlines() if line.strip()]
        return "\n".join(lines)
    return cleaned
