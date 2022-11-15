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
          <h1 className="item-title">{item.itemName}</h1>
          <img className="item-img" src={item.imgSrc} alt=""/>
          <h3 className="item-type">{item.itemType}</h3>
            <Table striped bordered hover size="sm">
              <tbody>
                <tr>
                  <td>
                    <button 
                      onClick={() => changeCartItemCounter(cartItem, -1)} 
                      className={cartItem.counter === 1 ? "item-btn item-btn-grey" : "item-btn item-btn-red"}>
                      -
                    </button>
                  </td>                 
                  <td>
                    <h1 className="text-center">
                      {cartItem.counter}
                    </h1>
                  </td>
                  <td>
                    <button
                      onClick={() => changeCartItemCounter(cartItem, 1)} 
                      className={cartItem.counter === 9 ? "item-btn item-btn-grey" : "item-btn item-btn-green"}>
                      +
                    </button>                               
                  </td>
                </tr>
              </tbody>
            </Table>           
          <span className="item-title">${totalCost}</span>
          <div className="remove-btn-container">
            <span className="button-primary button-primary-red">
              Remove Item
            </span>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <div className="cart-page-body">
    <div className="cart-container">    
      <div className="cart-table-container">
        <Table striped bordered hover>
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