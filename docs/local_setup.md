# Local Development Setup

1. Create a Python virtual environment and install dependencies:

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

2. Copy the example environment file and add your OpenAI API key:

```bash
cp .env.example .env
# edit .env
```

3. Start the backend server:

```bash
cd src/backend
python app.py
```

4. In a separate terminal start the React frontend:

```bash
cd src/frontend
npm install
npm start
```

The application will be available at `http://localhost:3000` with the backend API running on `http://localhost:5000`.
