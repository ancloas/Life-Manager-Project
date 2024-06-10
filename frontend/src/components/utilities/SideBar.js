import React from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/ToDo">ToDo</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/domains">Domains</Link></li>

      </ul>
    </div>
  );
}

export default Sidebar;
