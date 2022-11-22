import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";

import './NavBar.css';

const NavBar = () => {
  const { user } = useGlobalContext();

  const anonymousNavItems = [
    {
      label: "HOME",
      link: "/"
    },
    {
      label: "ABOUT",
      link: "/about"
    },
    {
      label: "MENU",
      link: "/menu"
    },    
    {
      label: "LOGIN / REGISTER",
      link: "/login"
    }
  ];

  const loggedInNavItems = [
    {
      label: "HOME",
      link: "/"
    },
    {
      label: "ABOUT",
      link: "/about"
    },
    {
      label: "MENU",
      link: "/menu"
    },
    {
      label: "CART",
      link: "/cart"
    },
    {
      label: "ACCOUNT",
      link: "/account"
    }
  ];

  // render different items depending on if logged in or not
  let navItems = user ? loggedInNavItems : anonymousNavItems;

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
    <div className="header">
      <Link to="/">
        <img className="nav-img" src="/img/Corn-Grub.png" alt=""/>
      </Link>
      <div className="nav-links-container">
        <ul className="nav-links">
          {renderedNavItems}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
