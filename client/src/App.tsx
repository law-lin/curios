import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from 'pages/MainPage';

import './App.css';

import Login from './pages/login';
import Register from './pages/register';

import { Header } from 'components/Header';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/' component={Header} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/app' component={MainPage} />
          <MainPage />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
