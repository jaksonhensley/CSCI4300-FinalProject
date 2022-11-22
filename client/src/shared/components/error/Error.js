import React from "react";
import { useLocation } from "react-router-dom";

import "./Error.css";

const Error = () => {
  let text = "Failed to render error message";
  const { state } = useLocation();
  if (state) {
    const { message } = state;
    if (message) {
      text = message;
    }
  } 
  return (
    <div className="error-container">                
      <h1 className="error-heading">ERROR</h1>
      <p className="error">{text}</p>
    </div>
  );
};

export default Error;