import React, { useState } from "react";
import { Link } from "react-router-dom";

import { CUISINE, SIDE, DRINK, DESSERT } from "./MenuSectionType";
import "./Menu.css";
import "../../shared/style/common.css";

const Menu = ({items, cart, menuSectionType}) => {
  const [cartState, setCartState] = useState(cart);
  const [menuSectionTypeState, setMenuSectionTypeState] = useState(menuSectionType);

  const menuSectionTypes = [
    CUISINE,
    SIDE,
    DRINK,
    DESSERT
  ];

  const getItemsOfType = (type) => {
    return items.filter((item) => item.itemType === type);
  }

  const renderedMenuSectionTypeSelector = menuSectionTypes.map((menuSectionType) => {
    const isSelected = menuSectionType === menuSectionTypeState;
    return (
      <li 
        key={menuSectionType} 
        onClick={isSelected ? undefined : () => setMenuSectionTypeState(menuSectionType)}
        className={isSelected ? "menu-section-type-selected" : "menu-section-type"}>
        {menuSectionType + "s"}
      </li>
    );
  });

  const renderedMenuItems = getItemsOfType(menuSectionTypeState).map((item) => {
    return (
      <React.Fragment key={item.id}>
        <hr/>
        <div className="menu-item">
          <div className="img-box">
            <img src={item.imgSrc} alt=""/>
          </div>
          <div className="item-about">
            <h1 className="item-title">{item.itemName}</h1>
            <h3 className="item-type">{item.itemType + " --- $" + item.itemPrice}</h3>
          </div>
          <div className="flex-container">
            <div className="flex-item">
              <Link to={"/item/" + item.id}>
                <span className="button-primary button-primary-green">View Item</span>
              </Link>    
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  });
   
  return (
    <div className="menu-container">
      <ul className="menu-section-types">
        {renderedMenuSectionTypeSelector}
      </ul>
      {renderedMenuItems}
    </div>
  );
};

Menu.defaultProps = {
  menuSectionType: CUISINE
};

export default Menu;