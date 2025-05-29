# Speech Therapy SOAP Note Generator

An automated system for generating Subjective sections of speech therapy SOAP notes using OpenAI's GPT model.

## Features

- Automated generation of Subjective sections for speech therapy SOAP notes
- Structured input for patient information and transition notes
- Version tracking for both frontend and backend
- Configurable OpenAI model settings
- Local development setup with environment variables

## Version Information

- Frontend: v1.0.0 (2024-05-26)
- Backend: v1.0.0 (2024-05-26)
- OpenAI Model: gpt-3.5-turbo

## Prerequisites

- Python 3.8 or higher
- Node.js 14 or higher
- OpenAI API key

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
FLASK_HOST=127.0.0.1
FLASK_PORT=3000
FLASK_DEBUG=True

# OpenAI Configuration
OPENAI_API_KEY=your_api_key_here
OPENAI_MODEL=gpt-3.5-turbo
OPENAI_MAX_TOKENS=3000

# CORS Configuration
CORS_ORIGINS=http://localhost:3000,http://localhost:8788
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/speech-soap-automated.git
cd speech-soap-automated
```

2. Install backend dependencies:
```bash
cd src/backend
pip install -r requirements.txt
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

## Running the Application

### Local Development

1. Start the backend server:
```bash
cd src/backend
python app.py
```

2. Start the frontend development server:
```bash
cd ../frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3000/api

### Using the Batch Script

For Windows users, you can use the provided batch script to start both servers:

```bash
local_start.bat
```

## API Endpoints

### Version Information
- `GET /api/version`
  - Returns version information for both frontend and backend
  - Response includes version numbers, build dates, and OpenAI model version

### Note Generation
- `POST /api/generate`
  - Generates a Subjective section based on provided information
  - Request body should include patient information and transition notes
  - Returns the generated note in the response

## Project Structure

```
speech-soap-automated/
├── src/
│   ├── backend/
│   │   ├── app.py              # Main Flask application
│   │   ├── config.py           # Configuration settings
│   │   ├── version.py          # Version information
│   │   ├── prompts/            # Prompt templates
│   │   └── requirements.txt    # Python dependencies
│   └── frontend/
│       ├── src/
│       │   ├── components/     # React components
│       │   ├── version.js      # Frontend version info
│       │   └── App.js          # Main React application
│       └── package.json        # Node.js dependencies
├── .env                        # Environment variables
└── local_start.bat            # Windows startup script
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 