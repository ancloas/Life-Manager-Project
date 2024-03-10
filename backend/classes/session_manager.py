from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from dotenv import load_dotenv
import os


load_dotenv()

sql_user_name= os.getenv('SQL_USERNAME')
sql_password= os.getenv('SQL_PASSWORD')
server_name = os.getenv('SQL_SERVER')
database_name = os.getenv('DATABASE_NAME')

class SessionManager:
    def __init__(self, engine):
        self.engine = engine
        self.Session = sessionmaker(bind=engine)
        self.session= self.Session()
        self._is_closed=False


    def create_session(self):
        """Create a new database session."""
        if self._is_closed:
            self.session = self.create_session()
        return self.Session()


    def close_session(self):
        """Close the database session."""
        if not self._is_closed:
            self._is_closed=True
            self.session.close()


    def __del__(self):
        """Destructor to close all sessions."""
        self.close_session()




engine = create_engine(f'mssql+pyodbc://{sql_user_name}:{sql_password}@{server_name}/{database_name}?driver=ODBC+Driver+17+for+SQL+Server')


session_manager= SessionManager(engine)