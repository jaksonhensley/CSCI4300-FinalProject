import React from "react";
import { useLocation } from "react-router-dom";

import "./Success.css";

const Success = () => {
  const { state } = useLocation();
  const { message } = state;
  return (   
    <div className="success-container">                
      <h1 className="success">SUCCESS</h1>
      <p>{message}</p>
    </div>
  );
};

export default Success;