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
    const blocks_10 = [];
    const blocks = Blocksof10mins["timeline"];
    const number_hours = blocks.length*10/60;


    blocks.forEach((element, index) => {
        let blockClassName = "block10";
        if (element.state === "present") {
            blockClassName += " present";
        } else if (element.state === "future") {
            blockClassName += " future";
        } else if (element.state === "past") {
            blockClassName += " past";
        }

        if (element.is_O_clock)
            blockClassName+=" hour"

        blocks_10.push(
            <div className={blockClassName} key={`block10_${index}`}>
                {blocks.length - index} {/* Display block index */}
            </div>
        );
    });

    return( 
    <div className="grid-container row">{blocks_10}</div>

);
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
