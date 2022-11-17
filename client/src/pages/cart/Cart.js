import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

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

  const changeCartItemCounter = (cartItemToChange, delta) =>{ 
    let updatedCart = cartState.map((cartItem) => {
      if (cartItemToChange.itemId === cartItem.itemId) {
        let newCount = cartItem.counter + delta;
        if (newCount < 1) {
          newCount = 1;
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
    const totalCost = cartItem.counter * item.itemPrice;
    return (
      <tr key={item.id}>
        <td className="cell">
          <div className="cart-item-container">
          <div className="item-info-container">
          <h1 className="item-title">{item.itemName}</h1>
          <h3 className="item-type">{item.itemType}</h3>
          <img className="cart-img" src={item.imgSrc} alt=""/>
          </div>
          <div className="item-btn-container">
          <div className="qty-container">
            <button 
              onClick={() => changeCartItemCounter(cartItem, -1)} 
              className={cartItem.counter === 1 ? "item-btn item-btn-grey" : "item-btn item-btn-red"}>
              -
            </button>
            <h1 className="counter">
              {cartItem.counter}
            </h1>
            <button
              onClick={() => changeCartItemCounter(cartItem, 1)} 
              className={cartItem.counter === 9 ? "item-btn item-btn-grey" : "item-btn item-btn-green"}>
              +
            </button>                               
            </div>
            <div className="cost-container">
            <span className="total-cost">${totalCost}</span>
            <div className="remove-btn-container">
            <span className="button-primary button-primary-red">
              Remove Item
            </span>
            </div>
          </div>
          </div>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <div className="cart-page-body">
    <div className="cart-container">    
      <div className="cart-table-container">
        <Table borderless>
          <thead>
            <th className="text-center cart-heading">Shopping Cart</th>         
          </thead>
          <tbody>
            {renderedCartItems}
          </tbody>
        </Table>   
      </div>
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