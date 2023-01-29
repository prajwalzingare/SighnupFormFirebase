import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  //if we got current user then it will render dashboard otherwise it will navigate to login page
  return currentUser ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
