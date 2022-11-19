import React from "react";
import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../../shared/context/GlobalContext";

const PrivateRoute = ({
    children,
    redirect
  }) => {
  const { user } = useGlobalContext();
  return user ? children : <Navigate to={redirect}/>;
};

export default PrivateRoute;