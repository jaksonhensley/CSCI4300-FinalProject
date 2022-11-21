import React from "react";
import { useLocation } from "react-router-dom";

import "./Error.css";

const Error = () => {
  const { state } = useLocation();
  const { message } = state;
  return (   
    <div className="error-container">                
      <h1 className="error">ERROR</h1>
      <p>{message}</p>
    </div>
  );
};

export default Error;