# Speech Therapy SOAP Notes Automation

## Project Overview
This project automates the Subjective section of speech therapy SOAP notes, reducing completion time to under 1 minute by replacing free-text writing with structured UI inputs and AI-generated narratives.
For details on the project, see [prjct.md](prjct.md)

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
For details on how the backend and frontend are organized, see [Architecture Notes](docs/architecture.md).
```
speech-soap-automated/
├── src/
│   ├── frontend/     # React frontend application
│   └── backend/      # Flask backend server
├── tests/            # Test files
└── docs/             # Documentation and architecture notes
```

## Development Setup

### Prerequisites
- Python 3.x
- Node.js (for frontend development)
- Git
- Google Cloud account
- OpenAI API key

### Local Development
Detailed instructions are available in [docs/local_setup.md](docs/local_setup.md).
1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd speech-soap-automated
   ```

2. Set up Python virtual environment:
   ```bash
   # Windows
   .\scripts\setup_env.ps1

   # Linux/Mac
   python -m venv venv
   source venv/bin/activate
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

### Development Tools
- Code formatting: `black .`
- Linting: `flake8`
- Import sorting: `isort .`
- Testing: `pytest`

For more detailed guidelines, see [Development Guidelines](docs/development_guidelines.md)

## Testing
```bash
# Run backend tests
pytest

# Run frontend tests
npm test
```

## Deployment
The application is automatically deployed to Google Cloud when changes are pushed to the main branch.

### Google Cloud Build Configuration
The project uses Google Cloud Build for continuous integration and deployment. The build process is defined in `cloudbuild.yaml` and includes:
- Installing Python dependencies
- Running tests
- Building the frontend application
- Deploying to Google Cloud App Engine

### Deployment Prerequisites
1. Google Cloud project set up
2. Cloud Build API enabled
3. App Engine API enabled
4. Appropriate IAM permissions configured

### Manual Deployment
To deploy manually:
```bash
# Deploy to Google Cloud
gcloud app deploy app.yaml
```

For more information about the deployment process, see the [Google Cloud documentation](https://cloud.google.com/build/docs).

## Contributing
1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License
[License information to be added]

## Contact
[Contact information to be added] 