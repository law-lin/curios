import React, { useContext } from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';

import ReactLoading from 'react-loading';
import { AuthContext } from 'providers/AuthProvider';

interface Props {
  component: React.ComponentType<RouteComponentProps<any>>;
  path?: string;
}

const PrivateRoute = ({ component: Component, ...rest }: Props) => {
  const { authenticated, loadingAuthState } = useContext(AuthContext);

  if (loadingAuthState) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <h1>Loading...</h1>
        <ReactLoading type='spinningBubbles' color='#990000' />
      </div>
    );
  }
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        authenticated ? <Component {...routeProps} /> : <Redirect to='/' />
      }
    />
  );
};

export default PrivateRoute;
