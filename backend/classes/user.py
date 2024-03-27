from sqlalchemy import create_engine, Column, Integer, String, DateTime, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
from sqlalchemy.orm import sessionmaker
from datetime import datetime
from dotenv import load_dotenv
import os
from sqlalchemy.orm import relationship
from .base  import Base


load_dotenv()

sql_user_name = os.getenv('SQL_USERNAME')
sql_password = os.getenv('SQL_PASSWORD')
server_name = os.getenv('SQL_SERVER')
database_name = os.getenv('DATABASE_NAME')

class User(Base):
    __tablename__ = 'User'

    ID = Column(Integer, primary_key=True)
    Username = Column(String(50), unique=True)
    Password = Column(String(255))
    Email = Column(String(100), unique=True)
    Full_Name = Column(String(100))
    Date_Created = Column(DateTime, default=func.current_timestamp())
    Date_Updated = Column(DateTime, onupdate=func.current_timestamp())
    Is_Admin = Column(Boolean, default=False)

    def __init__(self, username, password, email, full_name, is_admin=False):
        """Initialize a new User instance."""
        self.Username = username
        self.Password = password
        self.Email = email
        self.Full_Name = full_name
        self.Is_Admin = is_admin

    # Getter and setter methods for each property
    @property
    def username(self):
        return self.Username

    @username.setter
    def username(self, value):
        self.Username = value

    @property
    def password(self):
        return self.Password

    @password.setter
    def password(self, value):
        self.Password = value

    @property
    def email(self):
        return self.Email

    @email.setter
    def email(self, value):
        self.Email = value

    @property
    def full_name(self):
        return self.Full_Name

    @full_name.setter
    def full_name(self, value):
        self.Full_Name = value

    @property
    def date_created(self):
        return self.Date_Created

    @property
    def date_updated(self):
        return self.Date_Updated

    @property
    def is_admin(self):
        return self.Is_Admin

    @is_admin.setter
    def is_admin(self, value):
        self.Is_Admin = value



# Create engine and session
engine = create_engine(f'mssql+pyodbc://{sql_user_name}:{sql_password}@{server_name}/{database_name}?driver=ODBC+Driver+17+for+SQL+Server')
Base.metadata.create_all(engine)