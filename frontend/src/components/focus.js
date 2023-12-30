import React, { useState, useEffect } from 'react';

const FocusScreen = () => {
  const [pomodoroCount, setPomodoroCount] = useState(3);
  const [timerRunning, setTimerRunning] = useState(false);

  const startTimer = () => {
    if (!timerRunning) {
      setTimerRunning(true);
      document.getElementById('sand').style.height = '100%';
      setTimeout(() => {
        document.getElementById('sand').style.height = '0%';
        setPomodoroCount(prevCount => prevCount + 1);
        setTimerRunning(false);
      }, 25000 * 60); // Adjust the time for testing (25000 milliseconds = 25 seconds)
    }
  };

  const stopTimer = () => {
    setTimerRunning(false);
    document.getElementById('sand').style.height = '0%';
  };

  const exit = () => {
    // Add any additional exit logic here
    alert('Exiting Focus Screen');
  };

  useEffect(() => {
    // Cleanup function
    return () => {
      stopTimer(); // Stop the timer when the component unmounts
    };
  }, []);

  return (
    <div>
      <div id="pomodoroCount">Pomodoros Completed: <span id="pomodoroCounter">{pomodoroCount}</span></div>

      <div id="taskInfo">
        <label htmlFor="taskName" id="taskNameLabel">Task Name:</label>
        <input type="text" id="taskName" placeholder="Enter task name" />
        <input type="checkbox" id="completeTask" /> <label htmlFor="completeTask">Complete Task</label>
      </div>

      <div id="hourglassContainer">
        <div id="hourglass">
          <div id="sand"></div>
        </div>
      </div>

      <div id="controls">
        <button onClick={stopTimer}>Stop Timer</button>
        <button onClick={startTimer}>Play</button>
        <button onClick={exit}>Exit</button>
      </div>
    </div>
  );
};

export default FocusScreen;
