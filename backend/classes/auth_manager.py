from sqlalchemy import create_engine, Column, String, DateTime, Boolean, UniqueConstraint
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
from dotenv import load_dotenv
import os
from .user import User

Base = declarative_base()

load_dotenv()

sql_user_name = os.getenv('SQL_USERNAME')
sql_password = os.getenv('SQL_PASSWORD')
server_name = os.getenv('SQL_SERVER')
database_name = os.getenv('DATABASE_NAME')


class AuthManager:
    def __init__(self, session):
        self.session = session

    def register(self, username, password, email, full_name):
        existing_user = self.session.query(User).filter_by(Username=username).first()
        if existing_user:
            return {"is_success": False, "message": "Username already exists"}
        
        new_user = User(username=username, password=password, email=email, full_name=full_name)
        self.session.add(new_user)
        self.session.commit()
        return  {"is_success": True, "message": "User registered successfully"}

    def sign_in(self, username, password):
        user = self.session.query(User).filter_by(Username=username, Password=password).first()
        if user:
            return {"is_success": True, "message":  "Sign in successful", 'current_user' : user}
        else:
            return {"is_success": False,  "message": "Invalid credentials"}

    def sign_out(self):
        # In a real-world scenario, you might need to implement session management for sign-out functionality
        return {"is_success": True, "message":  "Sign out successful"}

    def is_authenticated(self, username):
        user = self.session.query(User).filter_by(Username=username).first()
        return user is not None
    





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
    auth_manager= AuthManager(session)
    a= auth_manager.register(username='a_v', password='12345', email='ava@bot.com', full_name='Anugrah Gupta')
    print(a)


    all_users = session.query(User).all()
    for user in all_users:
        print(user.ID, user.full_name)
    
    # Close the session
    session.close()
