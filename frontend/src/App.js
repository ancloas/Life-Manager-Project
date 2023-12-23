import './App.css';
import {useState,  useEffect } from 'react';
import config from './config';

function App() {
  const [data, setData]= useState({})

  useEffect(()=>{
    fetchData();
  },[]);

  const fetchData = async ()=>
  {
    try{
      const response = await fetch(`${config.apiBaseUrl}/data`)
      const jsonData = await response.json()
      setData(jsonData)
      console.log(jsonData)
    }
    catch(error)
    {
      console.log('Error', error)
    }
  }

  return (
    <div className="App">
      <h3>{data.message}</h3>
      <h3>does it even work?</h3>

    </div>
  );
}

export default App;
