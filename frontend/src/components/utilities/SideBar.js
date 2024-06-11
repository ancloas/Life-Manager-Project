import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
      <button className={`toggle-button ${isOpen ? '' : 'collapsed'}`} onClick={toggleSidebar}>
        <MenuIcon />
      </button>
        <br />
        <br />
      <div>
      {isOpen && (
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/ToDo">ToDo</Link></li>
          <li><Link to="/calendar">Calendar</Link></li> {/* Added calendar link */}
          <li><Link to="/Scheduler">Calendar</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/domains">Domains</Link></li>
        </ul>
      )}
      </div>
    </div>
  );
};

export default Sidebar;
