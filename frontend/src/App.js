// src/App.jsx

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TaskDetails from './components/screens/task_details_screen/taskdetail';
import { Home } from './components/screens/home/home';
import Sidebar from './components/utilities/SideBar';
import CalendarPage from './components/screens/month/CalandarPage';


function About() {
  return <h2>About</h2>;
}

function Contact() {
  return <h2>Contact</h2>;
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/task_details/:taskId" element={<TaskDetails />} />
            <Route path="/calendar" element={<CalendarPage />} /> {/* Add calendar route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
