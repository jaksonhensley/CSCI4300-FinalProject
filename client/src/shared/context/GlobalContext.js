import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

// initial state
const initState = {
  user: null,
  fetchingUser: false,
  cartItems: []
};

// reducer
const globalReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        fetchingUser: false
      };
    case "SET_CART_ITEMS":
      return {
        ...state,
        cartItems: action.payload
      };   
    case "RESET_USER":
      return {
        ...state,
        user: null,
        fetchingUser: false,
        cartItems: []
      }
    default:
      return state;
  }
};

// create context
export const GlobalContext = createContext(initState);

// provider component
export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(globalReducer, initState);

  useEffect(() => {
    getCurrentUser();
  }, []);

  // action: get current user
  const getCurrentUser = async () => {
    try {
      const userResp = await axios.get("/api/auth/current");
      if (userResp.data) {
        const cartItemsResp = await axios.get("/api/cart/current");
        if (cartItemsResp.data) {
          dispatch({
            type: "SET_USER",
            payload: userResp.data
          });
          dispatch({
            type: "SET_CART_ITEMS",
            payload: cartItemsResp.data
          });
        }
      } else {
        dispatch({
          type: "RESET_USER"
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: "RESET_USER"
      });
    }
  };

  const logout = async () => {
    console.log("Global context logout");
    try {
      await axios.put("/api/auth/logout");         
      dispatch({
        type: "RESET_USER"
      });
    } catch (err) {
      console.log(err);
    }        
  };

  const value = {
    ...state,
    getCurrentUser,
    logout
  };

  return (
    <GlobalContext.Provider value={value}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export function useGlobalContext() {
  return useContext(GlobalContext);
};