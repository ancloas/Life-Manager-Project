// RectangleComponent.jsx
import React, { useState } from "react";
import './rectangle.css'

 HabitComponent = ({ initialX, initialY }) => {
  const [x, setX] = useState(initialX);
  const [y, setY] = useState(initialY);


  return (
    <div className="box">
        Habit Section
  </div>
    
  );
};

export default HabitComponent;
