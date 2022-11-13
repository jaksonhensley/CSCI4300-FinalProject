import React, { useState, useEffect } from "react";

import "./Cart.css";
import "../../shared/style/common.css";

const Cart = ({items, cart}) => {
  const [cartState, setCartState] = useState(cart);

  const filterCartItems = () => {
    setCartState(cartState => cartState.filter((cartItem) => cartItem.counter > 0));
  };

  useEffect(() => {
    filterCartItems();
  }, [])

  const changeCartItemCounter = (cartItemToChange, delta) => {
    let updatedCart = cartState.map((cartItem) => {
      if (cartItemToChange.itemId === cartItem.itemId) {
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
    filterCartItems();
  };  

  const renderedCartItems = cartState.map((cartItem) => {    
    const item = items.find((item) => item.id === cartItem.itemId);
    return (
      <React.Fragment key={cartItem.itemId}>
        <hr/>
        <div className="item pad">
          <div className="img-box">
            <img src={item.imgSrc} alt=""/>
          </div>
          <div className="item-about">
            <h1 className="item-title">{item.itemName}</h1>
            <h3 className="item-type">{item.itemType}</h3>
          </div>
          <div className="flex-container">
            <div className="flex-item">
              <button 
                onClick={() => changeCartItemCounter(cartItem, -1)} 
                className={cartItem.counter === 1 ? "item-btn item-btn-grey" : "item-btn item-btn-red"}>
                -
              </button>
            </div>
            <div className="flex-item counter">
              {cartItem.counter}
            </div>
            <div className="flex-item">
              <button
                onClick={() => changeCartItemCounter(cartItem, 1)} 
                className={cartItem.counter === 9 ? "item-btn item-btn-grey" : "item-btn item-btn-green"}>
                +
              </button>             
            </div>
          </div>
          <div className="price">
            <div className="amount">${item.itemPrice}</div>
            <div className="remove">Remove</div>
          </div>
        </div>
        <hr/>
      </React.Fragment>  
    );
  });

  return (
    <div className="page-body">
      <div className="container">
        <div className="cart-header">
          <h3 className="cart-heading">Shopping Cart</h3>
          <div>
            <span className="action">Remove All</span>
          </div>
        </div>        
        {renderedCartItems}
        <div className="confirm-order-container">
        <button className="button-primary button-primary-green">
          <span className="confirm-order">CONFIRM ORDER</span>
        </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;