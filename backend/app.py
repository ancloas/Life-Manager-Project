# Filename - server.py

# Import flask and datetime module for showing date and time
from flask import Flask
import datetime
from flask_cors import CORS
from datetime import time
from classes.timeline import Timeline, Blockof10min
from flask import request, Response, redirect, jsonify

x = datetime.datetime.now()


user_session = {}   #key = user_id and value is dictionary for different states like timeline, etc




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

@app.route('/time_component', methods=['GET'])
def get_time_component():
	global user_session
	#get_user's wakeuptime
	wakeuptime='09:00'
	#get user's sleeptime
	sleeptime='22:00'
	try:
		timeline= Timeline(wakeuptime=wakeuptime, sleeptime=sleeptime)
	except ValueError as e:
		return jsonify({'message': e})
	_10minutes_blocks=[]
	for x in timeline.time_blocks:
		_10minutes_blocks.append(x.__dict__)


	return jsonify({'timeline': _10minutes_blocks})



	


	
# Running app
if __name__ == '__main__':
	app.run(host= '0.0.0.0',debug=True)
