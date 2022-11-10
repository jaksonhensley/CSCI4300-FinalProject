import React from 'react';
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
        <a href={navItem.link}>{navItem.label}</a>
      </li>
    );
  });

  return (
    <React.Fragment>
      <img className="nav-img" src="/img/CornGrub.png" alt=""/>
      <ul className="nav-links">
        {renderedNavItems}
      </ul>
    </React.Fragment>
  );
};

export default NavBar;
