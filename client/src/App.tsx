import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from 'pages/Main';

import 'App.css';

import Login from 'pages/Login';
import Register from 'pages/Register';

import { Header } from 'components/Header';

function App() {
  return (
    <div className='App'>
      <Router>
        <>
          <Header />
          <Switch>
            {/* <Route  path='/' component={Header} /> */}
            <Route exact path='/' component={Main} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />

            <Main />
          </Switch>
        </>
      </Router>
    </div>
  );
}

export default App;
