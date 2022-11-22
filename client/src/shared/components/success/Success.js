import React from "react";
import { useLocation } from "react-router-dom";

import "./Success.css";

const Success = () => {
  let text = "Failed to render success message";
  const { state } = useLocation();
  if (state) {  
    const { message } = state;
    if (message) {
      text = message;
    }
  } 
  return (   
    <div className="success-container">                
      <h1 className="success-heading">SUCCESS</h1>
      <p className="success">{text}</p>
    </div>
  );
};

export default Success;