import React from "react";
import { Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = Cookies.get("jwtToken"); // Get the JWT token from cookies

  if (!token) {
    return <Navigate to="/login" />; // Redirect to login if no token
  }

  return <Component {...rest} />; // Render the component if token exists
};

export default ProtectedRoute;
