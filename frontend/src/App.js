import React, { useState, useEffect } from 'react';
import './App.css';
import config from './config';
import { Desktop } from './components/home/home'; // Importing Desktop from Home.js
import 'bootstrap/dist/css/bootstrap.min.css';
import ToDo from './components/home/todo';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App() {
  return (
    <Router>
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/task_details" component={TaskDetails} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
    
    // <div className="App">
      
    //     {/* <React.Fragment>
    //       <Desktop /> 
    //     </React.Fragment> */}
    //     <ToDo />
    // </div>
  );
}

export default App;
