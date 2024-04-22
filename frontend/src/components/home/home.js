import React from "react";
import "./home.css";
import { TimeFrame } from "./time_component";
import ToDo from './todo';
// import {TaskComponent} from "./snippets/task/task"
// import {UpcomingComponent} from "./snippets/upcoming/upcoming"
// import {UpcomingComponent} from "./snippets/upcoming/upcoming"


export const Home = () => {
    return (
        <div className="container">
                <TimeFrame></TimeFrame>
                <ToDo></ToDo>  
        </div>
    );
};
