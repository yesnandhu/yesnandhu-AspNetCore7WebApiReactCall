
import React, { useState } from 'react';

function SetConst() {
  // Declare a state variable using useState
  const [value, setValue] = useState('Initial Value');

  const handleChangeValue = () => {
    setValue('New Value'); // This changes the value of the state variable
  };

  return (
    <div>
      <p>{value}</p>
      <button onClick={handleChangeValue}>Change Value</button>
    </div>
  );
}

export default SetConst;