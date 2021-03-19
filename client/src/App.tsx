import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import MainPage from 'pages/MainPage';

import './App.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <MainPage />
      </Router>
    </div>
  );
}

export default App;
