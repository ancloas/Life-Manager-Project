from sqlalchemy import create_engine, Column, Integer, String, DateTime, Boolean, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime
from dotenv import load_dotenv
import os
from .user import User
from .base import Base
from utilities.encoding_utils import encode_primary_key, decode_primary_key
from enum import Enum


load_dotenv()

sql_user_name= os.getenv('SQL_USERNAME')
sql_password= os.getenv('SQL_PASSWORD')
server_name = os.getenv('SQL_SERVER')
database_name = os.getenv('DATABASE_NAME')


class Status(Enum):
    NOT_STARTED = 'not_started'
    IN_PROGRESS = 'in_progress'
    COMPLETED = 'completed'
    values = ['not_started', 'in_progress', 'completed']


class Task(Base):
    __tablename__ = 'Task'

    ID = Column(Integer, primary_key=True)
    Name = Column(String(50))
    Description = Column(String(255))
    Status = Column(String(10))
    Priority = Column(String(10))
    Due_Date = Column(DateTime)
    Estimate_in_minutes = Column(Integer)
    Tags_associated = Column(String(255))
    ParentID = Column(Integer)
    Actual_Effort_in_minutes = Column(Integer)
    Project_ID_associated = Column(Integer)
    Syllabus_ID_associated = Column(Integer)
    Date_Created = Column(DateTime, default=func.current_timestamp())
    Date_Updated = Column(DateTime, onupdate=func.current_timestamp())
    Is_Repeatable = Column(Boolean)
    User_ID = Column(Integer, ForeignKey('User.ID'))  # Define foreign key column
    
    
    def __init__(self, user_id,  name, description, status='Pending', priority=None,
                 due_date=None, estimate_minutes=None, tags_associated=None,
                 parentid=None, 
                 project_id_associated=None, syllabus_id_associated=None,
                 is_repeatable=None):
        """Initialize a new Task instance."""
        self.atomic=True
        self.Name = name
        self.User_ID = user_id  # Set the User_ID attribute with the provided user ID
        self.Description = description
        self.Status = status
        self.Priority = priority
        self.Due_Date = due_date
        self.Estimate_in_minutes = estimate_minutes
        self.Tags_associated = tags_associated
        self.ParentID = parentid
        self.Actual_Effort_in_minutes = 0
        self.Project_ID_associated = project_id_associated
        self.Syllabus_ID_associated = syllabus_id_associated
        self.Is_Repeatable = is_repeatable

    
    def schedule_task(self, due_date, estimate_minutes):
        """Schedule the task by setting due date and estimated time."""
        self.Due_Date = due_date
        self.Estimate_in_minutes = estimate_minutes

    
    def update_progress(self, actual_effort_minutes):
        """Update the progress by setting actual effort in minutes."""
        self.Actual_Effort_in_minutes += actual_effort_minutes
        self.Status = Status.COMPLETED.value if actual_effort_minutes >= self.Estimate_in_minutes else Status.IN_PROGRESS.value
    
    
    def update_status(self, new_status):
        if new_status in Status.values.value:
            self.status=new_status
    

    def complete(self):
        self.status= Status.COMPLETED.value
        
        
    def update(self, name=None, description=None, priority=None,status=None, estimate_minutes=None, tags=None, parentid=None, project_id_associated=None, syllabus_id_associated=None, is_repeatable=None):
        if name:
            self.name=name
        if description:
            self.description=description    
        if priority:
            self.priority=priority
        if status and (status in Status.values.value):
            self.status=status
        if estimate_minutes:
            self.estimate_minutes=estimate_minutes
        if tags:
            self.tags_associated=tags
        if parentid:
            self.parentid= parentid
        if project_id_associated:
            self.project_id_associated=project_id_associated
        if syllabus_id_associated:
            self.syllabus_id_associated=syllabus_id_associated
        if is_repeatable:
            self.is_repeatable=is_repeatable


    # Getter and setter methods for each property
    @property
    def name(self):
        return self.Name

    @name.setter
    def name(self, value):
        self.Name = value

    @property
    def description(self):
        return self.Description

    @description.setter
    def description(self, value):
        self.Description = value

    @property
    def status(self):
        return self.Status

    @status.setter
    def status(self, value):
        self.Status = value

    @property
    def priority(self):
        return self.Priority

    @priority.setter
    def priority(self, value):
        self.Priority = value

    @property
    def due_date(self):
        return self.Due_Date

    @due_date.setter
    def due_date(self, value):
        self.Due_Date = value

    @property
    def estimate_minutes(self):
        return self.Estimate_in_minutes

    @estimate_minutes.setter
    def estimate_minutes(self, value):
        self.Estimate_in_minutes = value

    @property
    def tags_associated(self):
        return self.Tags_associated

    @tags_associated.setter
    def tags_associated(self, value):
        self.Tags_associated = value

    @property
    def parentid(self):
        return self.ParentID

    @parentid.setter
    def parentid(self, value):
        self.ParentID = value

    @property
    def actual_effort_minutes(self):
        return self.Actual_Effort_in_minutes

    @actual_effort_minutes.setter
    def actual_effort_minutes(self, value):
        self.Actual_Effort_in_minutes = value

    @property
    def project_id_associated(self):
        return self.Project_ID_associated

    @project_id_associated.setter
    def project_id_associated(self, value):
        self.Project_ID_associated = value

    @property
    def syllabus_id_associated(self):
        return self.Syllabus_ID_associated

    @syllabus_id_associated.setter
    def syllabus_id_associated(self, value):
        self.Syllabus_ID_associated = value

    @property
    def date_created(self):
        return self.Date_Created

    @property
    def date_updated(self):
        return self.Date_Updated

    @property
    def is_repeatable(self):
        return self.Is_Repeatable

    @is_repeatable.setter
    def is_repeatable(self, value):
        self.Is_Repeatable = value

    
    def to_dict(self):
        """Return a dictionary representation of the task."""
        return {
            "Encoded_Task_ID": encode_primary_key(self.ID),
            "Name": self.Name,
            "User_ID": self.User_ID,
            "Description": self.Description,
            "Status": self.Status,
            "Priority": self.Priority,
            "Due_Date": self.Due_Date,
            "Estimate_in_minutes": self.Estimate_in_minutes,
            "Tags_associated": self.Tags_associated,
            "parentid": self.parentid,
            "Actual_Effort_in_minutes": self.Actual_Effort_in_minutes,
            "Project_ID_associated": self.Project_ID_associated,
            "Syllabus_ID_associated": self.Syllabus_ID_associated,
            "Is_Repeatable": self.Is_Repeatable
        }

# Replace 'your_database_uri' with the appropriate connection URI for your SQL Server instance.
# Example: 'mssql+pyodbc://username:password@localhost:1433/your_database'
engine = create_engine(f'mssql+pyodbc://{sql_user_name}:{sql_password}@{server_name}/{database_name}?driver=ODBC+Driver+17+for+SQL+Server')


 
# Create the table in the database
Base.metadata.create_all(engine)
# Query tasks
Session = sessionmaker(bind=engine)
session = Session()

# Example of using the Task model
if __name__ == '__main__':
    # Create a new task
    new_task = Task(
        name='Example Task',
        user_id=1,
        description='This is a sample task.',
        priority='High',
        tags_associated='tag1,tag2',
        project_id_associated=1,
        syllabus_id_associated=2,
        is_repeatable=True
    )
    session.add(new_task)
    # Schedule the task
    new_task.schedule_task(due_date=datetime(2024, 1, 31), estimate_minutes=120)
    session.commit()
    # Update progress
    new_task.update_progress(actual_effort_minutes=90)
    session.commit()


    all_tasks = session.query(Task).all()
    for task in all_tasks:
        print(task.ID, task.Name, task.Status, task.Due_Date, task.Estimate_in_minutes, task.Actual_Effort_in_minutes)
    
    # Close the session
    session.close()
