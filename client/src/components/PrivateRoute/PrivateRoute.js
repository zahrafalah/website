import React from "react";

import { Redirect, Route } from "react-router-dom";

import auth from "../../../../routes/userRoutes";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.getToken() !== null ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "auth/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
