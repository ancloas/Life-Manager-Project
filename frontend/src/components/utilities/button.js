import React from 'react';

function CustomButton({ onClick, count, text}) {
  return (
    <button onClick={onClick} >
        {text}
    </button>
  );
}

export default CustomButton;
