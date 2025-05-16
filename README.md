# Speech Therapy SOAP Notes Automation

## Project Overview
This project automates the Subjective section of speech therapy SOAP notes, reducing completion time to under 1 minute by replacing free-text writing with structured UI inputs and AI-generated narratives.

## Features
- Structured input system for patient assessment
- Phrase bank system with type-search functionality
- LLM-powered narrative generation
- Local development and testing support
- Simple text export functionality

## Technical Stack
- Frontend: Web Application (Simplest framework suitable for PoC)
- Backend: Python
- AI: OpenAI's LLM
- Deployment: Google Cloud
- Authentication: Hardcoded credentials in backend code

## Project Structure
```
speech-soap-automated/
├── src/
│   ├── frontend/     # Frontend application code
│   └── backend/      # Backend server code
├── tests/            # Test files
└── docs/            # Documentation
```

## Development Setup

### Prerequisites
- Python 3.x
- Node.js (for frontend development)
- Git
- Google Cloud account
- OpenAI API key

### Local Development
1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd speech-soap-automated
   ```

2. Set up Python virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your OpenAI API key
   ```

4. Start the development server:
   ```bash
   # Backend
   cd src/backend
   python app.py

   # Frontend
   cd src/frontend
   npm install
   npm start
   ```

## Testing
```bash
# Run backend tests
pytest

# Run frontend tests
npm test
```

## Deployment
The application is automatically deployed to Google Cloud when changes are pushed to the main branch.

## Contributing
1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License
[License information to be added]

## Contact
[Contact information to be added] 