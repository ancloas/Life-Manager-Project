// src/App.jsx

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TaskDetails from './components/screens/task_details_screen/taskdetail';
import { Home } from './components/screens/home/home';
import Sidebar from './components/utilities/SideBar';
import TodoComponent from './components/screens/home/todo';
import CalendarPage from './components/screens/month/CalandarPage';


function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/task_details/:taskId" element={<TaskDetails />} />
            <Route path="/calendar" element={<CalendarPage />} /> {/* Add calendar route */}
            <Route path="/ToDo" element={<TodoComponent/>} />
            <Route path="/domains" element={<TodoComponent/>} />
            <Route path="/projects" element={<TodoComponent/>} />          
            <Route path="/task_details/:taskId" element={<TaskDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
