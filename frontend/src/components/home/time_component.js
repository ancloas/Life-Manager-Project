import React,  { useState, useEffect }  from "react";
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



    console.log(Blocksof10mins);
    const hours = [];
  
    for (let i = Blocksof10mins; i > 0; i--) {
      hours.push(
        <div className="hour" key={`hour_${i}`}>
          {i} hours
        </div>
      );
    }
  
    return <div className="grid-container">{hours}</div>;
  };
  

export const TimeFrame = () => {
    
  const [times, setTimes] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('${config.apiUrl}/time_component');
        const data = await response.json();
        setTimes(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

    const gridParams = times

    return (<div> 
            <div className="row">
                    <div className="heading"><h3 >Time</h3></div>
                    {/* Pass parameters to GridComponent */}
            </div>
            <div className="row">
                <GridComponent {...gridParams} />
            </div>
            </div>
    );
};
