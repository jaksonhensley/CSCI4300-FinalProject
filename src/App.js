import React, { useCallback, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

import NavBar from "./shared/components/nav/NavBar";
import Home from "./pages/Home";
import About from "./pages/about/About";
import Account from "./pages/account/Account";
import Auth from "./pages/auth/Auth";
import Item from "./pages/Item";
import Cart from "./pages/Cart";
import Message from "./pages/Message";
import Header from "./shared/components/header/Header";

import { LOGIN, REGISTER, REQUEST_RESET_PASS, DO_RESET_PASS } from "./pages/auth/AuthMode";
import AuthContext from "./shared/context/AuthContext";

/*

  Home: 
    Home page with logo, some "featured" items listed with links

  About:
    Introduce team members and talk about inspiration for project

  Login:
    User can login. If logged in, redirect to message page saying "already logged in".

  Register:
    User can register. If logged in, redirect to message page saying "to register new account, please logout".

  Account:
    User can view and edit profile. If not logged in, redirect to login page.

  Request reset pass:
    User can request password change. If logged in, just say "token sent to your email". If not logged in,
    prompt user for email address and then send token.

  Confirm reset pass:
    Requires email and token as params. (Email is used to query user in database.) If user and token associated
    with user are both found in db, then prompt user to and confirm new password. Otherwise, throw error message
    and ask user to try again with new token.

  Item:
    Requires item id as param. User can view item and click on button to add it to cart. If user is not logged in,
    then clicking on "add to cart" will redirect to login page. Have it set up so that after logging in, user is 
    still redirected to cart with item successfully added.

  Message:
    Not sure if this page is needed. Just a template page for showing any "on success" or "on error" messages.

  Default to home page if no matching url.

*/

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const doLogin = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const doLogout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  routes = (
    <Routes>
      <Route path="/" element={ <Home/> }/>
      <Route path="/about" element={ <About/> }/>
      <Route path="/login" element={ <Auth authmode={LOGIN}/> }/>
      <Route path="/register" element={ <Auth authmode={REGISTER}/> }/>            
      <Route path="/request-reset-pass" element={ <Auth authmode={REQUEST_RESET_PASS}/>}/>
      <Route path="/do-reset-pass/:email/:token" element={ <Auth authmode={DO_RESET_PASS}/> }/>
      <Route path="/account" element={ isLoggedIn ? <Account/> : <Navigate to="/login"/> }/>
      <Route path="/item/:id" element={ <Item/>} exact/>
      <Route path="/cart" element={ <Cart/>} />
      <Route path="/message" element={ <Message/>} />
      <Route path="*" element={ <Navigate to="/" replace/>} />
    </Routes>
  );

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: doLogin, logout: doLogout}} 
    >
      <Router>     
          <Header>
            <NavBar/>
          </Header>       
          {routes}
      </Router>
    </AuthContext.Provider>
  )
}

export default App;
