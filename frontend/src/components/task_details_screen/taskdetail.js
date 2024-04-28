import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './taskdetail.css';
import { Button } from 'react-bootstrap';
import { BsArrowLeft } from 'react-icons/bs';


const StatusInput = ({ status, onStatusChange }) => {
  return (
    <div>
      <label className="task-details-label">Status:</label>
      <select
        className="status-select"
        value={status}
        onChange={(e) => onStatusChange('Status', e.target.value)}
      >
          <option key='not_started' value='not_started'>
            {'Not Started'}
          </option>
          <option key='in_progress' value='in_progress'>
            {'In Progress'}
          </option>
          <option key='completed' value='completed'>
            {'Completed'}
          </option>
      </select>
    </div>
  );
};

const NameInput = ({ taskname, onNameChange }) => {
  return (
    <div className="task-details-field">
      <label className="task-details-label">Name:</label>
      <input 
      className='task-details-input'
      type="text"
      value={taskname}
      onChange={(e) => onNameChange('Name', e.target.value)}
    />
    </div>
  );
};

const PriorityInput = ({ priority, onPriorityChange }) => {
  console.log('priority is:'+  priority)
  return (
    <div>
    <label className="task-details-label">Priority</label>
    <select
      className="priority-select" // Add a CSS class for styling
      value={priority}
      onChange={(e) => onPriorityChange('Priority', e.target.value)}
    >
      <option value="High">High</option>
      <option value="Medium">Medium</option>
      <option value="Low">Low</option>
    </select>
    </div>
  );
};

// const StatusInput = ({ status, onStatusChange }) => {
//   return (
//     <div>
//     <label className="task-details-label">Status</label>
//     <select
//       className="priority-select" // Add a CSS class for styling
//       value={status}
//       onChange={(e) => onStatusChange(e.target.value)}
//     >
//       <option value="High">Not Started</option>
//       <option value="Medium">In Progress</option>
//       <option value="Low">Completed</option>
//     </select>
//     </div>
//   );
// };

const DescriptionSection = ({ description, onDescriptionChange }) => {
  return (
    <div className="task-details-field">
      <label className="task-details-label">Description:</label>
      <textarea
      className="task-details-textarea"
      value={description}
      onChange={(e) => onDescriptionChange('Description', e.target.value)}
      />
    </div>
  );
};

const SaveTask = ({ task, classname }) => {
  const handleSave = async () => {
    try {
      const formdata = new FormData();
      formdata.append("task_id", task.Encoded_Task_ID); // Assuming task.ID is already base64 encoded
      formdata.append("task_name", task.Name); // Use the task name
      formdata.append("description", task.Description); // Use the task name
      formdata.append("priority", task.priority); // change state

      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow"
      };

      // Send the update request to the backend
      const response = await fetch("http://127.0.0.1:5000/update_task", requestOptions);

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      // Handle the response
      const result = await response.text();
      console.log(result); // Log the result
    } catch (error) {
      console.error(error); // Log any errors
    }
  };

  return (
    <button class= {classname} onClick={handleSave}>Save</button>
  );
};

const TaskDetails = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  var req =1
  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        // Check if task details are already loaded
        console.log('request' + req)
        req = req + 1
        if (task) {
          return;
        }
        
        const formdata = new FormData();
        formdata.append("task_id", taskId); // Assuming taskId is already base64 encoded
        const requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow"
        };
  
        // Fetch task details from the backend
        const response = await fetch("http://127.0.0.1:5000/get_task_by_id", requestOptions);
        
        if (!response.ok) {
          console.log(response)
          throw new Error('Failed to fetch task details');
        }
        
        const taskData = await response.json();
        setTask(taskData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchTaskDetails();
  }, [taskId, task]); // Add task dependency to prevent unnecessary fetch requests

  const handleFieldChange = (fieldName, value) => {
    setTask(prevTask => ({
      ...prevTask,
      [fieldName]: value
    }));
  };

  // const handlePriorityChange = (newPriority) => {
  //   setTask((prevTask) => ({
  //     ...prevTask,
  //     Priority: newPriority
  //   }));
  // };
  
  
  // const handleDescriptionChange = (newDescription) => {
  //   setTask((prevTask) => ({
  //     ...prevTask,
  //     Description: newDescription
  //   }));
  // };
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!task) {
    return <div>Task not found</div>;
  }

  
  return (
    <div className="task-details-container">
      <h1 className="task-details-heading">Task Details</h1>
      <div className="task-details-buttons">
        <Link to="/" className="task-details-button">
          <BsArrowLeft />
        </Link>
        <div className="task-details-button">
          <SaveTask task={task} />
        </div>
      </div>

      <div className="task-details-content">
        <NameInput taskname= {task.Name} onNameChange={handleFieldChange} />        
        <PriorityInput  priority={task.Priority} onPriorityChange={handleFieldChange}/>     
        <DescriptionSection description={task.Description} onDescriptionChange={handleFieldChange} />
        <StatusInput status={task.Status} onStatusChange={handleFieldChange} />

      </div>
    </div>
  );
};

export default TaskDetails;
