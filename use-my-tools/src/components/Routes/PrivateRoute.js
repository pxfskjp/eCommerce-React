import React from "react";
import { Route, Redirect } from "react-router-dom";
import LoginPage from '../LoginPage';

// const PrivateRoute = ({ component: Component, authUser, path, ...rest }) => (
//     <Route
//       {...rest}
//       render={props =>
//         authUser ? (
//           <Component {...props} {...rest} />
//         ) : (
//           <Redirect to="/login" />
//         )
//       }
//     />
// );

// export default PrivateRoute;

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