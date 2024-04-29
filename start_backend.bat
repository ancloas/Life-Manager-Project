@echo off

echo Activating virtual environment...
call .\.venv\Scripts\activate

echo Changing directory to backend folder...
cd backend

echo Starting Flask server...
flask run
