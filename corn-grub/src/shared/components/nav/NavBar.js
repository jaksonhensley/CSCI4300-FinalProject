import React from 'react';
import './NavBar.css';

const NavBar = () => {
  return (
    <React.Fragment>
      <img className="nav-img" src="/img/CornGrub.png" alt=""/>
      <ul className="nav-links">
        <li className="nav-item">
            <a href="/">HOME</a>
        </li>
        <li className="nav-item">
            <a href="/">ORDER</a>
        </li>
        <li className="nav-item">
            <a href="/">CART</a>
        </li>
      </ul>
    </React.Fragment>
  );
};

export default NavBar;
