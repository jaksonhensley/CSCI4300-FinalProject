import React from "react";
import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../../shared/context/GlobalContext";

const PrivateRoute = ({
  children,
  redirect
}) => {
  console.log("Private route component");
  const { user } = useGlobalContext();
  console.log("User: " + JSON.stringify(user));
  if (user !== null) {
    console.log("Return children");
    return children;
  } else {
    console.log("Return redirect: " + redirect);
    return <Navigate to={redirect}/>;
  }
};

export default PrivateRoute;