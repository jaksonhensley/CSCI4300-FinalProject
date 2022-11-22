import React from "react";
import { useLocation } from "react-router-dom";

import "./Error.css";

const Error = () => {
  // default text
  let text = [
    "Failed to render error message"
  ];

  // fetch errors 
  const { state } = useLocation();
  if (state) {
    const { errors } = state;
    if (errors) {
      text = errors;
    }
  } 

  // render list of errors
  const renderedErrors = text.map((err) => {
    return (
      <li>
        <span className="error">{err}</span>
      </li>
    );
  });

  return (
    <div className="error-container">                
      <h1 className="error-heading">ERROR</h1>
      <ul className="error-list">
        {renderedErrors}
      </ul>
    </div>
  );
};

export default Error;