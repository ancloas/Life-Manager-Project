import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskDetails from './components/screens/task_details_screen/taskdetail';
import { Home } from './components/screens/home/home';
import SideBar from './components/utilities/SideBar';
import TodoComponent from './components/screens/home/todo';

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
        <SideBar /> {/* Add the Sidebar */}
        <div className="main-content">
          <Routes>
            <Route path="/" index element={<Home/>} />
            <Route path="/about" element={<About/>} />
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
