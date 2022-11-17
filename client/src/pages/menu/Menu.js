import React, { useState } from "react";
import { Table } from "react-bootstrap";


import { CUISINE, SIDE, DRINK, DESSERT } from "./MenuSectionType";
import "../../shared/style/common.css";
import "./Menu.css";

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
  };

  const cartContainsItem = (item) => {
    return cartState.some((cartItem) => cartItem.itemId === item.id);
  };

  const addToCart = (item) => {
    const newCartItem = {
      itemId: item.id,
      counter: 1
    };
    setCartState(currentCartState => [...currentCartState, newCartItem]);
  };

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
      <tr key={item.id}>
        <td className="cell">
          <span className="item-title">{item.itemName + " - $" + item.itemPrice}</span>
          <img className="item-img" src={item.imgSrc} alt=""/>
          <div className="item-action">
            {cartContainsItem(item) &&
              <span className="already-in-cart">Already in Cart</span>
            }
            {!cartContainsItem(item) && 
              <button 
                onClick={() => addToCart(item)}
                className="add-to-cart">
                <span>Add to Cart</span>
              </button>
            }    
          </div>  
        </td>
      </tr>            
    );
  });
   
  return (
    <div className="menu-container">
      <ul className="menu-section-types">
        {renderedMenuSectionTypeSelector}
      </ul>
      <div className="menu-table-container">
        <Table>              
          <tbody>
            {renderedMenuItems}
          </tbody>
        </Table>      
      </div>
    </div>
  );
};

Menu.defaultProps = {
  menuSectionType: CUISINE
};

export default Menu;