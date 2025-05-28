# Local Development Setup

1. Create a Python virtual environment and install dependencies:

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

2. Copy the example environment files and add your OpenAI API key:

```bash
cp .env.example .env
cp .env.local.example .env.local
cp src/frontend/.env.local.example src/frontend/.env.local
# edit .env and .env.local files
```

3. Start the backend server (uses `FLASK_PORT` from `.env.local`):

```bash
cd src/backend
python app.py
```

4. In a separate terminal start the React frontend (uses `PORT` from `src/frontend/.env.local`):

```bash
cd src/frontend
npm install
npm start
```

The application will be available at `http://localhost:$FRONTEND_PORT` with the backend API running on `http://localhost:$FLASK_PORT` (configured in `.env.local`).
