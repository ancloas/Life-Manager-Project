import "./tasklist.css"; // Import the CSS file
import TaskComponent from './task'

const TaskListComponent = ({tasks}) =>{
    if (!tasks){
        return (<div>No Tasks to show</div>);
    }
    else{
    return (<div>
            <ul>
                {tasks.map((task_item, index) => (
                    <li id={index}>
                        <TaskComponent task= {task_item}/>
                    </li>
                ))
                
                }



            </ul>
    </div>);
    }
}


export default TaskListComponent;
