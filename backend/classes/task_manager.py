import datetime
from task import Task
from session_manager import SessionManager

class Task_Manager:
    def __init__(self, session_manager: SessionManager):
        self.tasks = []
        self.session_manager = session_manager


    #Add Task
    def add_task(self, user_id, name, description=None, priority='low', tags=None, subtasks= None, project_id_associated=None, syllabus_id_associated=None, is_repeatable=False):
        """Add a task to the task manager."""
        task = Task(
        name='Example Task',
        user_id=1,
        description='This is a sample task.',
        priority='High',
        tags_associated='tag1,tag2',
        subtasks='Subtask 1, Subtask 2',
        project_id_associated=1,
        syllabus_id_associated=2,
        is_repeatable=True
        )
        self.tasks.append(task) 
        session = self.session_manager.create_session()
        session.add(task)
        session.commit()
        self.session_manager.close_session()



    #Delete Task
    def remove_task(self, task_id):
        """Remove a task from the task manager and database."""
        task = self.get_task_by_id(task_id=task_id)
        if task in self.tasks:
            self.tasks.remove(task)
            session = self.session_manager.create_session()
            session.delete(task)
            session.commit()
            self.session_manager.close_session(session)


    #Start Task
        
    
    #Update Task details: name, description, due_date, estimate, etc
        


    # List Tasks
    def get_task_by_id(self, task_id):
        """Get a task by its ID."""
        for task in self.tasks:
            if task.ID == task_id:
                return task
        return None

    def get_tasks_by_status(self, status):
        """Get tasks with a specific status."""
        return [task for task in self.tasks if task.Status == status]

    def get_overdue_tasks(self):
        """Get tasks that are overdue."""
        return [task for task in self.tasks if task.Status != 'Completed' and task.Due_Date is not None and task.Due_Date < datetime.now()]     

    def list_all_tasks(self, status):
        return self.tasks    