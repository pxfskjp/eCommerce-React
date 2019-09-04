import React from "react";
import { Route } from "react-router-dom";
import LoginPage from '../LoginPage';

export default function PrivateRoute({
  component: Component,
  authenticated,
  ...rest
}) {
  // console.log('PrivateRoute authenticated: ' + authenticated);
  return (
    <Route
      {...rest}
      render={props => 
        authenticated === true ? (
          <Component {...props} {...rest} />
        ) : (
          // <Redirect to={{ pathname:"/login", state: {from: props.location}}}/>
          <LoginPage />
        )
      }
    />
  );
}