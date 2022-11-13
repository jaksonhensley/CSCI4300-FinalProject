import React, { useState } from "react";

import { CUISINE, SIDE, DRINK, DESSERT } from "./MenuSectionType";
import "./Menu.css";

const Menu = ({menuSectionProp}) => {
  const [menuSectionState, setMenuSectionState] = useState(menuSectionProp);

  const menuSections = [
    CUISINE,
    SIDE,
    DRINK,
    DESSERT
  ];

  const renderedMenuSection = menuSections.map((menuSection) => {
    let isSelected = menuSection === menuSectionState;
    return (
      <span 
        key={menuSection} 
        onClick={isSelected ? undefined : () => setMenuSectionState(menuSection)}
        className={isSelected ? "menu-section-selected" : "menu-section-item"}>
        {menuSection + "s"}
      </span>
    );
  });

  return (
    <div className="menu-container">
      <div className="menu-section">
          {renderedMenuSection}
      </div>
      <div>
        <h1>{menuSectionState}</h1>
      </div>
    </div>
  );
};

Menu.defaultProps = {
  menuSectionProp: CUISINE
};

export default Menu;