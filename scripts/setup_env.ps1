# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\Activate

# Upgrade pip
python -m pip install --upgrade pip

# Install dependencies
pip install -r requirements.txt

Write-Host "Environment setup complete! Virtual environment is activated."
Write-Host "To activate the environment in the future, run: .\venv\Scripts\Activate" 