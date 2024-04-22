import React from "react";
import { Checkbox } from "@mui/material";
import { Card } from "antd";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import "./task.css"; // Import the CSS file
import { Link } from "react-router-dom";

const PlayButton = () => {
  return <PlayCircleFilledIcon />;
};

const TaskComponent = ({ task }) => {
  if (!task) {
    return <div>No task provided</div>;
  }

  return (
    <div className="task-content">
      <Checkbox />
      <PlayButton />
      <Link
        to={{
          pathname: `/task_details`,
          state: { task: task }
        }}
        className="task-link"
      >
        {task.Name}
      </Link>
      <LinearScaleIcon />
    </div>
  );
};

export default TaskComponent;

