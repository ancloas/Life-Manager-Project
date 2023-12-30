import React, { useState, useEffect } from 'react';
import './App.css';
import config from './config';
import { Desktop } from './components/home/home'; // Importing Desktop from Home.js
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      
        <React.Fragment>
          <Desktop /> {/* Render the Desktop component */}
        </React.Fragment>
    </div>
  );
}

export default App;
