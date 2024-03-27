import React, { useState } from 'react';

function CustomInput({ onInputChange }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
    onInputChange(event.target.value); // Pass input value to parent component
  };

  return (
    <input 
      type="text" 
      value={inputValue} 
      onChange={handleChange} 
      placeholder="Enter text here" 
    />
  );
}

export default CustomInput;
