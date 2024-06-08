import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './taskdetail.css';
import { Button } from 'react-bootstrap';
import { BsArrowLeft } from 'react-icons/bs';

const TaskForm = ({ task, onSave }) => {
  const [formData, setFormData] = useState(task);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="task-details-field">
        <label className="task-details-label">Name:</label>
        <input
          className="task-details-input"
          type="text"
          name="Name"
          value={formData.Name}
          onChange={handleChange}
        />
      </div>
      <div className="task-details-field">
        <label className="task-details-label">Priority:</label>
        <select
          className="priority-select"
          name="Priority"
          value={formData.Priority}
          onChange={handleChange}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <div className="task-details-field">
        <label className="task-details-label">Description:</label>
        <textarea
          className="task-details-textarea"
          name="Description"
          value={formData.Description}
          onChange={handleChange}
        />
      </div>
      <div className="task-details-field">
        <label className="task-details-label">Status:</label>
        <select
          className="status-select"
          name="Status"
          value={formData.Status}
          onChange={handleChange}
        >
          <option value="not_started">Not Started</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <button type="submit" className="task-details-button">
        Save
      </button>
    </form>
  );
};

const TaskDetails = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const formdata = new FormData();
        formdata.append('task_id', taskId);
        const requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow',
        };

        const response = await fetch(
          'http://127.0.0.1:5000/get_task_by_id',
          requestOptions
        );

        if (!response.ok) {
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
  }, [taskId]);

  const handleSave = async (data) => {
    try {
      const formdata = new FormData();
      formdata.append('task_id', task.Encoded_Task_ID);
      formdata.append('task_name', data.Name);
      formdata.append('description', data.Description);
      formdata.append('priority', data.Priority);
      formdata.append('status', data.Status);
      console.log(data.Status)

      const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      const response = await fetch(
        'http://127.0.0.1:5000/update_task',
        requestOptions
      );

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

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
      </div>

      <div className="task-details-content">
        <TaskForm task={task} onSave={handleSave} />
      </div>
    </div>
  );
};

export default TaskDetails;
