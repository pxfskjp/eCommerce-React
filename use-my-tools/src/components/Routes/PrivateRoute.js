import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthUserContext } from '../Session';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <AuthUserContext.Consumer>
    {authUser => (
      <Route
        {...rest}
        render={props =>
          authUser ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
        />
    )}
  </AuthUserContext.Consumer>
);

export default PrivateRoute;