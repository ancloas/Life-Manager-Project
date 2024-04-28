import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TaskDetails from './components/task_details_screen/taskdetail';
import { Home } from './components/home/home'

function About() {
  return <h2>About</h2>;
}

function Contact() {
  return <h2>Contact</h2>;
}

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            {/* <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li> */}
            {/* <li><Link to="/task_details">TaskDetails</Link></li> */}
          </ul>
        </nav>

        <Routes>
          <Route path="/" index element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/task_details/:taskId" element={<TaskDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
