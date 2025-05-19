# Architecture Overview

The project is organized into a modular structure:

- **frontend**: React application located in `src/frontend`.
- **backend**: Flask API located in `src/backend`.
- **openai_client**: Wrapper around the OpenAI API used by the backend.

The backend exposes a simple `/api/generate` endpoint that calls the OpenAI API and returns generated text. The frontend communicates with this endpoint to retrieve generated SOAP note content.

All configuration values are loaded from environment variables using the `python-dotenv` package. The local development environment uses a `.env` file which should never be committed to source control.
