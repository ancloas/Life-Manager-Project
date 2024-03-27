
const TaskDetails =(task) =>{

    const jsonString = JSON.stringify(task, null, 2); // The 2 here adds indentation for readability


    return (
        <pre>
          {jsonString}
        </pre>
      ); 
}