import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";

import { useGlobalContext } from "../../shared/context/GlobalContext";
import { CUISINE, SIDE, DRINK, DESSERT } from "./MenuSectionType";

import "../../shared/style/common.css";
import "./Menu.css";
import { useNavigate } from "react-router-dom";

const Menu = () => {  
  const [cart, setCart] = useState([]);
  const [items, setItems] = useState([]);
  const [currType, setCurrType] = useState(CUISINE);

  const { user } = useGlobalContext();
  const navigate = useNavigate();

  // for convenience, create array of menu section types
  const menuSectionTypes = [
    CUISINE,
    SIDE,
    DRINK,
    DESSERT
  ];

  // load cart data if user is present, else set cart state to empty array
  useEffect(() => {
    if (!user) {
      setCart([]);
      return;
    }
    (async () => {
      const { data } = await axios.get("/api/cart/current");
      setCart(data);
    })()
    .catch((err) => {
      console.log(err);     
    });
  }, [user]);

  // reload items when menu section type state changes
  useEffect(() => {
    (async () => {      
      const { data } = await axios.get("/api/items/" + currType);
      setItems(data);      
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
    console.log("Check if cart contains item");
    console.log(typeof cart);
    console.log(cart);    
    return cart.some((cartItem) => cartItem.itemId === item._id);
  };

  // handle add item to the user's cart
  const handleAddItemToCart = async (itemId) => {    
    console.log("Handle add item to cart");

    // if no user present, then fail fast
    if (!user) {
      console.log("Can not add item to cart when not logged in");
      return;
    }    

    // add item to cart
    await axios.post("/api/cart/new", {
      itemId: itemId,    
    })
    .then(() => {
      console.log("Item added to cart");
    })
    .catch((err) => {
      console.log(err);
    });

    // update the user's cart
    if (!user) {
      setCart([]);
      return;
    }
    (async () => {
      const { data } = await axios.get("/api/cart/current");
      setCart(data);
    })()
    .catch((err) => {
      console.log(err);     
    });
  };

  // the rendered menu items
  const renderedMenuItems = items.map((item) => {
    return (      
      <tr key={item._id}>
        <td className="cell">
          <span className="item-title">{item.itemName + " - $" + item.itemPrice}</span>
          <img className="item-img" src={item.imgSrc} alt=""/>
          <div>
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
              <div className="item-action">
                <button 
                  onClick={() => handleAddItemToCart(item._id)}
                  className="add-to-cart">
                    <span>Add to Cart</span>
                </button>
              </div>
            }    
          </div>  
          <div>
            <div className="item-action">
              <button
                onClick={() => navigate(`/reviews/${item._id}`)}
                className="button-primary button-primary-green">
                  Reviews
              </button>
            </div>
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