import React, { useState, useEffect } from 'react';
import config from '../../../config';
import Banner from '../../utilities/banner';
import TaskComponent from './snippets/task/task';
import TaskListComponent from './snippets/task/tasklist';
import './todo.css';

const NewTaskComponent = () => {
  const [taskName, setTaskName] = useState('');
  const [showBanner, setShowBanner] = useState(false);
  const [bannerType, setBannerType] = useState('');
  const [bannerMessage, setBannerMessage] = useState('');

  const handleInputChange = (value) => {
    setTaskName(value);
  };

  const handleAddTask = async () => {
    if (taskName.trim() !== '') {
      const target_url = `${config.apiBaseUrl}/add_task`;
      try {
        const formdata = new FormData();
        formdata.append("task_name", taskName);

        const requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow"
        };

        const response = await fetch(target_url, requestOptions);

        if (!response.ok) {
          throw new Error('Failed to add task');
        }

        const data = await response.json();
        const message = data.message;
        setBannerMessage(`${message} '${taskName}'`);
        setBannerType('success');
        setShowBanner(true);
        setTaskName(''); // Clear input field
      } catch (error) {
        console.error('Error adding task:', error);
        setBannerMessage('Failed to add task. Please try again.');
        setBannerType('error');
        setShowBanner(true);
      }
    } else {
      setBannerMessage('Task name cannot be empty.');
      setBannerType('error');
      setShowBanner(true);
    }
  };

  return (
    <div className="new-task-container">
      <input 
        type="text" 
        value={taskName} 
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Add a new task..."
      />
      <button onClick={handleAddTask}>+</button>
      {showBanner && (
        <Banner type={bannerType} message={bannerMessage} onClose={() => setShowBanner(false)} timeout={3000} />
      )}
    </div>
  );
};

const ActiveTasksComponent = () => {
  const [tasks, setTasks] = useState([]);

  // Function to fetch tasks
  const fetchTasks = async () => {
    try {
      const target_url = `${config.apiBaseUrl}/all_tasks`;
      const response = await fetch(target_url);
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      console.log(data)
      setTasks(data); // Update tasks state with fetched data
      tasks.forEach(task => {
        console.log('Task:', task);
      }); 
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Fetch tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, []); // Empty dependency array means this effect runs only once after the component mounts

  // Example of setting up a timer to periodically refresh tasks
  useEffect(() => {
    const intervalId = setInterval(fetchTasks, 60000); // Refresh every 1 minute
    return () => clearInterval(intervalId); // Cleanup function to clear the interval when component unmounts
  }, []); // Empty dependency array means this effect runs only once after the component mounts

  return (
    <div className="active-tasks-container">
      {/* <h2>Active Tasks</h2> */}
      <TaskListComponent tasks={tasks}/>
    </div>
  );
};

function TodoComponent() {
  return (
    <div className="todo-container">
      <NewTaskComponent />
      <ActiveTasksComponent />
    </div>
  );
}

export default TodoComponent;
