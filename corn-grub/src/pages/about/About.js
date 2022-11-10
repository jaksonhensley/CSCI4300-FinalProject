import React from "react";

import "./About.css";
import "../../shared/style/common.css";

const About = () => {
  return (
    <div className="about-container">
      <h1 className="text-center">
         Fall 2022 Group Project -- CSCI 4300
      </h1>
      <hr/>
      <h2 className="text-center">
        React, Axios, MongoDB
      </h2>
      <hr/>
      <div className="team-list-container">
        <h3>
          Group members:
        </h3>      
        <div>
          <ul className="team-list">
            <li>John Lavender</li>
            <li>Jackson Henley</li>
            <li>Jacob Kossler</li>
          </ul>
        </div>      
      </div>
      <hr/>
      <div className="text-center">
        <a 
          className="github-link link-primary" 
          target="_blank" 
          rel="noopener noreferrer"
          href="https://github.com/jaksonhensley/CSCI4300-FinalProject">
          Github repo
        </a>
      </div>
    </div>
  );
};

export default About;