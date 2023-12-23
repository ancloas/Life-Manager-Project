# Filename - server.py

# Import flask and datetime module for showing date and time
from flask import Flask
import datetime
from flask_cors import CORS

x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)
CORS(app, origins='http://localhost:3000',)  # Specify the exact origin of your frontend


# Route for seeing a data
@app.route('/')
def home():

	# Returning an api for showing in reactjs
	return {
		'greet':"Welcome! geek", 
		}

@app.route('/data')
def get_time():

	# Returning an api for showing in reactjs
	return {
		'message':"hello! fellas", 
		}

	
# Running app
if __name__ == '__main__':
	app.run(host= '0.0.0.0',debug=True)
