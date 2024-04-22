import React from 'react';
import { useLocation } from 'react-router-dom';

const TaskDetails = () => {
  const location = useLocation();
  const task = location.state.task;
  const jsonString = JSON.stringify(task, null, 2); // The 2 here adds indentation for readability

  if (!task) {
    return <div>No task provided</div>;
  }

  return (
    <div>
      {jsonString}
    </div>
  );
};

export default TaskDetails;
