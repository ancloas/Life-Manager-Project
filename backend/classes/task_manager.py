import datetime
from .task import Task  # Assuming you have defined Task class
from utilities.encoding_utils import decode_primary_key

class Task_Manager:
    def __init__(self, session):
        self.session = session

    def add_task(self, user_id, name, description=None, priority='low', estimate_minutes=None, tags=None, parentid=None, project_id_associated=None, syllabus_id_associated=None, is_repeatable=False):
        """Add a task to the task manager."""
        task = Task(
            name=name,
            user_id=user_id,
            description=description,
            priority=priority,
            tags_associated=tags,
            parentid=parentid,
            estimate_minutes= estimate_minutes,
            project_id_associated=project_id_associated,
            syllabus_id_associated=syllabus_id_associated,
            is_repeatable=is_repeatable
        )
        self.session.add(task)
        self.session.commit()

    def update_task(self, task_id,  name=None, description=None, priority=None, estimate_minutes=None, tags=None, parentid=None, project_id_associated=None, syllabus_id_associated=None, is_repeatable=None, encrypted=False):
        
        task = self.get_task_by_id(task_id, encryted= encrypted)
        task.update(task_id, name, description, priority, estimate_minutes, tags, parentid, project_id_associated, syllabus_id_associated, is_repeatable)  
        self.session.commit()


    def remove_task(self, task_id):
        """Remove a task from the task manager and database."""
        task = self.get_task_by_id(task_id=task_id)
        if task:
            self.session.delete(task)
            self.session.commit()

    def get_task_by_id(self, task_id, encryted=False, user_id=None)->Task: 
        """Get a task by its ID."""
        if encryted:
            task_id= decode_primary_key(task_id)
        return self.session.query(Task).filter_by(ID=task_id).first()

    def get_tasks_by_status(self, status)->list[Task]:
        """Get tasks with a specific status."""
        return self.session.query(Task).filter_by(Status=status).all()
    
    def get_active_tasks(self)->list[Task]:
        return self.session.query(Task).filter_by(Task.Status !='completed').all()


    def get_overdue_tasks(self)->list[Task]:
        """Get tasks that are overdue."""
        return self.session.query(Task).filter(Task.Status != 'Completed', Task.Due_Date < datetime.datetime.now()).all()


    def list_all_tasks_for_user_id(self, user_id)->list[Task]:
        """List all tasks."""
        return self.session.query(Task).filter_by(User_ID= user_id).all()
    

    def close_session(self):
        """Close the session."""
        self.session.close()


    def complete_task(self, task_id, encryted = False):
        task=self.get_task_by_id(task_id=task_id, encryted=encryted)
        task.complete()
        self.session.commit()


    def __del__(self):
        """Destructor to close the session."""
        self.session.close()
  
    
