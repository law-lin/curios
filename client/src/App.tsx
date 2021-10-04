import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'App.css';

// Components
import { Header } from 'components/Header';
import PrivateRoute from 'components/PrivateRoute';
import { AuthProvider } from 'providers/AuthProvider';

// Pages
import Landing from 'pages/Landing';
import Login from 'pages/Login';
import Register from 'pages/Register';
import Main from 'pages/Main';
import Join from 'pages/Join';

function App() {
  return (
    <div className='App'>
      <Router>
        <AuthProvider>
          <Header />
          <Switch>
            {/* <Route  path='/' component={Header} /> */}
            <Route exact path='/' component={Landing} />
            <PrivateRoute path='/c' component={Main} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/verify-email' component={Register} />
            <Route path='/join/:classId' component={Join} />
            <Main />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
