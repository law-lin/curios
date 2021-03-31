import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from 'pages/MainPage';

import './App.css';

import LoginPage from './pages/LoginPage';
import Register from './pages/register';

import { Header } from 'components/Header';

function App() {
  return (
    <div className='App'>
      <Router>
        <Header />
        <Switch>
          {/* <Route exact path='/' component={Header} /> */}
          <Route exact path='/' component={MainPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={Register} />

          <MainPage />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
