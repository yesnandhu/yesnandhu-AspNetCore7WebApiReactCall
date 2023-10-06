import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReadData from './ReadData';
import SetConst from './SetConst';
import DataGridWithFilter from './DataGridWithFilter';

function App() {
  return (
    <div>
       
      <h1>Welcome to My React App</h1>
      <p>This is a simple welcome message created using React and TypeScript.</p>

      <DataGridWithFilter />
    </div>
    
  );
}

export default App;
