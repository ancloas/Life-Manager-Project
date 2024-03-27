import React, { useState, useEffect } from "react";
import "./time_component.css";
import config from '../../config'

const RectangleComponent = ({ initialX, initialY }) => {
    const [x, setX] = useState(initialX);
    const [y, setY] = useState(initialY);

    return (
        <div
            className="grid-item box-rectangle"
            style={{ left: x + "px", top: y + "px" }}
        ></div>
    );
};

const GridComponent = ({ Blocksof10mins }) => {
    console.log('The block of 10 minutes are', Blocksof10mins);
    const hours = [];
    const data= Blocksof10mins
    const blocks= Blocksof10mins["timeline"]
    var i=0
    console.log('block list is ', blocks);
     blocks.forEach(element => {
       i=i+1
       hours.push(
         <div className="hour" key={`hour_${i}`}>
             {i} 
         </div>
     );
     });
    return <div className="grid-container">{hours}</div>;
};

export const TimeFrame = () => {
    const [times, setTimes] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${config.apiBaseUrl}/time_component`);
                const data = await response.json();
                console.log(data)
                setTimes(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Render GridComponent only when times is not null
    return (
        <div>
            <div className="row">
                <div className="heading"><h3 >Time</h3></div>
            </div>
            <div className="row">
                {times && <GridComponent Blocksof10mins={times} />}
            </div>
        </div>
    );
};
