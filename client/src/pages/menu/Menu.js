import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";

import { useGlobalContext } from "../../shared/context/GlobalContext";
import { CUISINE, SIDE, DRINK, DESSERT } from "./MenuSectionType";

import "../../shared/style/common.css";
import "./Menu.css";

const Menu = () => {
  const { user } = useGlobalContext();
  const [cart, setCart] = useState({});
  const [items, setItems] = useState({});
  const [currType, setCurrType] = useState(CUISINE);

  // for convenience, create array of menu section types
  const menuSectionTypes = [
    CUISINE,
    SIDE,
    DRINK,
    DESSERT
  ];

  // load cart data on component mount
  useEffect(() => {
    (async () => {
      const { cartData } = await axios.get("/api/cart/current");
      setCart(cartData);
    })()
    .catch((err) => {
      console.log(err);     
    });
  }, []);

  // reload items when menu section type state changes
  useEffect(() => {
    (async () => {      
      const { itemData } = await axios.get("/api/items/" + currType);
      setItems(itemData);      
    })()
    .catch((err) => {
      console.log(err);
    });
  }, [currType]);

  // the type nav in which the user can select a menu section type to display
  const renderedTypeNav = menuSectionTypes.map((type) => {
    const isSelected = type === currType;
    return (
      <li 
        key={type} 
        onClick={isSelected ? undefined : () => setCurrType(type)}
        className={isSelected ? "menu-section-type-selected" : "menu-section-type"}>
          {type + "s"}
      </li>
    );
  });

  // returns true if the cart contains the item, else false
  const cartContainsItem = (item) => {
    return cart.some((cartItem) => cartItem.itemId === item._id);
  };

  // adds the item to the user's cart
  const addItemToCart = async (item) => {
    if (!user) {
      console.log("Can not add item to cart when not logged in");
      return;
    }
    await axios.post("/api/cart/new", {
      itemId: item._id,    
    })
    .catch((err) => {
      console.log(err);
    });
  };

  // the rendered menu items
  const renderedMenuItems = items.map((item) => {
    return (      
      <tr key={item.id}>
        <td className="cell">
          <span className="item-title">{item.itemName + " - $" + item.itemPrice}</span>
          <img className="item-img" src={item.imgSrc} alt=""/>
          <div className="item-action">
            {
              !user && 
                <span className="not-logged-in">Must be logged in to add cart item</span>
            }
            {
              user && cartContainsItem(item) &&
                <span className="already-in-cart">Already in Cart</span>
            }
            {
              user && !cartContainsItem(item) && 
                <button 
                  onClick={() => addItemToCart(item)}
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
        {renderedTypeNav}
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

export default Menu;