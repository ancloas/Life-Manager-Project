from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

Base = declarative_base()

class Event(Base):
    __tablename__ = 'Event'

    ID = Column(Integer, primary_key=True)
    Name = Column(String(50))
    Description = Column(String(255))
    Priority = Column(String(10))
    StartTime = Column(DateTime)
    EndTime = Column(DateTime)
    Tags_associated = Column(String(255))
    Project_ID_associated = Column(Integer)
    Syllabus_ID_associated = Column(Integer)
    Date_Created = Column(DateTime, default=func.current_timestamp())
    Date_Updated = Column(DateTime, onupdate=func.current_timestamp())
    Is_Repeatable = Column(Boolean)
    repeat_frequency = Column(String(10))
    User_ID = Column(Integer, ForeignKey('User.ID'))  # Define foreign key column
    user = relationship("User", back_populates="events")

    is_recurring = Column(Boolean)
    repeat_interval = Column(String(50))
    repeat_end_date = Column(DateTime)

    __mapper_args__ = {
        'polymorphic_identity': 'event',
        'polymorphic_on': is_recurring
    }

    def __init__(self, user_id, name, description, priority=None,
                 start_time=None, end_time=None, tags_associated=None,
                 project_id_associated=None, syllabus_id_associated=None,
                 is_repeatable=None, repeat_frequency=None,
                 repeat_interval=None, repeat_end_date=None):
        """Initialize a new Event instance."""
        self.User_ID = user_id
        self.Name = name
        self.Description = description
        self.Priority = priority
        self.StartTime = start_time
        self.EndTime = end_time
        self.Tags_associated = tags_associated
        self.Project_ID_associated = project_id_associated
        self.Syllabus_ID_associated = syllabus_id_associated
        self.Is_Repeatable = is_repeatable
        self.repeat_frequency = repeat_frequency
        self.is_recurring = False
        self.repeat_interval = repeat_interval
        self.repeat_end_date = repeat_end_date

class RecurringEvent(Event):
    __mapper_args__ = {'polymorphic_identity': True}

class OneTimeEvent(Event):
    __mapper_args__ = {'polymorphic_identity': False}

# Define the User class if not defined
class User(Base):
    __tablename__ = 'User'

    ID = Column(Integer, primary_key=True)
    # Define other user attributes as needed
    events = relationship("Event", back_populates="user")

# Assuming you have already created an engine and session
engine = create_engine('sqlite:///example.db')
Base.metadata.create_all(engine)
