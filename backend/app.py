# Filename - server.py

# Import flask and datetime module for showing date and time
from flask import Flask
import datetime
from flask_cors import CORS
from datetime import time
from classes.timeline import Timeline, Blockof10min
from flask import request, Response, redirect, jsonify
from classes.task_manager import Task_Manager
from classes.session_manager import session_manager
from classes.auth_manager import AuthManager
x = datetime.datetime.now()


user_session = {}   #key = user_id and value is dictionary for different states like timeline, etc
session= session_manager.create_session()
task_manager = Task_Manager(session=session)
#TODO change to get the current user
current_user_id=1

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

@app.route('/add_task', methods=['POST'])
def add_task():
    # Retrieve task details from the request
	task_name = request.form.get('task_name')
	description = request.form.get('description', None)
	priority = request.form.get('priority', 'low')
	tags = request.form.get('tags', None)
	parentid = request.form.get('parentid', None)
	project_id_associated = request.form.get('project_id_associated', None)
	syllabus_id_associated = request.form.get('syllabus_id_associated', None)
	is_repeatable = request.form.get('is_repeatable', False)
	estimate_minutes = request.form.get('estimate_minutes', None)

	#create session
	session= session_manager.create_session()
	task_manager = Task_Manager(session=session)
	
    # Add the task using the Task_Manager object
	try:
		task_manager.add_task(
            user_id=1,  # Assuming you need to specify a user ID
            name=task_name,
            description=description,
            priority=priority,
            tags=tags,
            parentid=parentid,
			estimate_minutes=estimate_minutes,
            project_id_associated=project_id_associated,
            syllabus_id_associated=syllabus_id_associated,
            is_repeatable=is_repeatable
        )
		return jsonify({'message': 'Task added successfully'})
	except Exception as e:
		return jsonify({'error': str(e)}), 500  # Internal Server Error

@app.route('/update_task', methods=['POST'])
def update_task():
	# Extract task ID from the request
	encrypyed_task_id = request.form.get('task_id')
	task_name = request.form.get('task_name')
	description = request.form.get('description', None)
	status =  request.form.get('status', None)
	priority = request.form.get('priority', 'low')
	tags = request.form.get('tags', None)
	parentid = request.form.get('parentid', None)
	project_id_associated = request.form.get('project_id_associated', None)
	syllabus_id_associated = request.form.get('syllabus_id_associated', None)
	is_repeatable = request.form.get('is_repeatable', False)
	estimate_minutes = request.form.get('estimate_minutes', None)

	#create session
	session= session_manager.create_session()
	task_manager = Task_Manager(session=session)

	try:
		task_manager.update_task(encrypyed_task_id,name=task_name, priority=priority, description=description, status=status, parentid=parentid, tags=tags, project_id_associated=project_id_associated, syllabus_id_associated=syllabus_id_associated, is_repeatable=is_repeatable, estimate_minutes=estimate_minutes, encrypted=True)
		return jsonify({'message': 'Task updated successfully'})
	except Exception as e:
		print(e)
		return jsonify({'error': str(e)}), 500 



@app.route('/remove_task', methods=['POST'])
def remove_task():
    # Extract task ID from the request
    task_id = request.form.get('task_id')
    
    # Remove the task using Task_Manager object
    task_manager.remove_task(task_id)
    
    return jsonify({'message': 'Task removed successfully'}), 200

@app.route('/active_tasks', methods=['GET'])
def list_active_task():
	#create session
	session= session_manager.create_session()
	task_manager = Task_Manager(session=session)
	# List active tasks using Task_Manager object
	active_tasks = task_manager.get_active_tasks()
    
    # Prepare data for response
	task_list = [task.to_dict() for task in active_tasks]
    
	return jsonify(task_list), 200

@app.route('/all_tasks', methods=['GET'])
def all_tasks():
	#create session
	session= session_manager.create_session()
	task_manager = Task_Manager(session=session)
	
	tasks = task_manager.list_all_tasks_for_user_id(user_id=current_user_id)
	task_list = [task.to_dict() for task in tasks]
	return jsonify(task_list), 200

@app.route('/get_task_by_id', methods= ['POST'])
def get_task_by_id():
	encrypyed_task_id = request.form.get('task_id')
	
	#create session
	session= session_manager.create_session()
	task_manager = Task_Manager(session=session)

	print(encrypyed_task_id)
	task = task_manager.get_task_by_id(task_id=encrypyed_task_id, encryted=True)
	session.close()
	return jsonify(task.to_dict()), 200



@app.route('/complete_task', methods = ['POST'])
def complete_task():
	#create session
	session= session_manager.create_session()
	task_manager = Task_Manager(session=session)

	encrypyed_task_id = request.form.get('task_id')
	task_manager.complete_task(task_id=encrypyed_task_id, encryted=True)
	return jsonify('task completed successfully'), 200



	
# Running app
if __name__ == '__main__':
	app.run(host= '0.0.0.0',debug=True)
