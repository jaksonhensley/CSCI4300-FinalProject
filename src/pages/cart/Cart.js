import React, { useState } from "react";
import { Button } from "react-bootstrap";

import "./Cart.css";

const Cart = ({items, cart}) => {
  const [cartState, setCartState] = useState(cart);

  const findItem = (cartItem) => {
    return items.find((item) => item.id === cartItem.itemId);
  };

  const changeCartItemCounter = (item, delta) => {
    const updatedCart = cartState.map((cartItem) => {
      if (item.id === cartItem.id) {
        let newCount = cartItem.counter + delta;
        if (newCount < 1) {
          newCount = 1;
        }
        if (newCount > 9) {
          newCount = 9;
        }
        return {...cartItem, counter: newCount};
      }
      return cartItem;
    });
    setCartState(updatedCart);
  };  

  const renderedItems = cartState.map((cartItem) => {
    const item = findItem(cartItem);
    return (
      <React.Fragment key={cartItem.id}>
        <hr/>
        <div className="item pad">
          <div className="img-box">
            <img src={item.imgSrc} alt=""/>
          </div>
          <div className="about">
            <h1 className="item-title">{item.itemName}</h1>
          </div>
          <div className="counter">
            <button
              onClick={() => changeCartItemCounter(cartItem, 1)} 
              className={cartItem.counter === 9 ? "item-btn item-btn-grey" : "item-btn item-btn-green item-btn-hover"}>
              +
            </button>
          <div className="counter">{cartItem.counter}</div>
            <button 
              onClick={() => changeCartItemCounter(cartItem, -1)} 
              className={cartItem.counter === 1 ? "item-btn item-btn-grey" : "item-btn item-btn-red itm-btn-hover"}>
              -
            </button>
          </div>
          <div className="price">
            <div className="amount">${item.itemPrice}</div>
            <div className="remove"><u>Remove</u></div>
          </div>
        </div>
        <hr/>
      </React.Fragment>
    );   
  });

  return (
    <div className="page-body">
      <div className="container">
        <div className="header">
          <h3 className="heading">Shopping Cart</h3>
          <h5 className="action">Remove All</h5>
        </div>        
        {renderedItems}
      </div>
    </div>
  );
};

export default Cart;