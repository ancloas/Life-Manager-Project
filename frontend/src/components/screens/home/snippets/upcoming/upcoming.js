// RectangleComponent.jsx
import React, { useState } from "react";
import './upcoming.css'

const UpcomingComponent = ({ initialX, initialY }) => {
  const [x, setX] = useState(initialX);
  const [y, setY] = useState(initialY);


  return (
    <div className="box">
        Habit Section
  </div>
    
  );
};

export default UpcomingComponent;
