import React from "react";
import { Link } from "react-router-dom";

import './NavBar.css';

const NavBar = () => {
  const navItems = [
    {
      label: "HOME",
      link: "/"
    },
    {
      label: "ABOUT",
      link: "/about"
    },
    {
      label: "ACCOUNT",
      link: "/account"
    },
    {
      label: "CART",
      link: "/cart"
    }
  ];

  const renderedNavItems = navItems.map((navItem) => {
    return (        
      <li key={navItem.label} className="nav-item">
        <Link to={navItem.link}>
          <span>{navItem.label}</span>
        </Link>      
      </li>
    );
  });

  return (
    <React.Fragment>
      <Link to="/">
        <img className="nav-img" src="/img/CornGrub.png" alt=""/>
      </Link>
      <ul className="nav-links">
        {renderedNavItems}
      </ul>
    </React.Fragment>
  );
};

export default NavBar;
