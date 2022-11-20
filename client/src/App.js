import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

import NavBar from "./shared/components/nav/NavBar";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Account from "./pages/account/Account";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RequestResetPass from "./pages/auth/RequestResetPassword";
import DoResetPwd from "./pages/reset-pwd/DoResetPwd";
import Menu from "./pages/menu/Menu";
import Cart from "./pages/cart/Cart";
import Loading from "./shared/components/loading/Loading";
import Success from "./shared/components/success/Success";

import { CUISINE, SIDE, DRINK, DESSERT } from "./pages/menu/MenuSectionType";
import { GlobalProvider } from "./shared/context/GlobalContext";
import { useGlobalContext } from "./shared/context/GlobalContext";
import PrivateRoute from "./shared/components/PrivateRoute";
import ValidateReg from "./pages/auth/ValidateReg";

const App = () => {

  const tempUsers = [
    {
      id: 1,
      email: "john@email.com",
      username: "John",
      password: "123"
    },
    {
      id: 2,
      email: "jackson@email.com",
      username: "Jackson",
      password: "123"
    },
    {
      id: 3,
      email: "jacob@email.com",
      username: "Jacob",
      password: "123"
    }
  ];

  const tempPwdResetTokens = [
    {
      userId: 1,
      code: "token1"
    },
    {
      userId: 2,
      code: "token2"
    },
    {
      userId: 1,
      code: "token3"
    }
  ];

  const tempItems = [
    {
      id: 1,
      itemName: "Shepherd's Pie",
      itemType: CUISINE,
      itemPrice: 9,
      imgSrc: "/img/Shepherd's-Pie.jpg"
    },
    {
      id: 2,
      itemName: "Cornmeal Fish",
      itemType: CUISINE,
      itemPrice: 10,
      imgSrc: "/img/Cornmeal-Fried-Fish.jpg"
    },
    {
      id: 3,
      itemName: "Cornbread",
      itemType: SIDE,
      itemPrice: 3,
      imgSrc: "/img/Corn-Bread.jpg"
    },
    {
      id: 4,
      itemName: "Grilled corn",
      itemType: SIDE,
      itemPrice: 4,
      imgSrc: "/img/Grilled-Corn.jpg"
    },
    {
      id: 5,
      itemName: "Corn Milk",
      itemType: DRINK,
      itemPrice: 3,
      imgSrc: "/img/Corn-Milk.jpg"
    },
    {
      id: 6,
      itemName: "Corn Beer",
      itemType: DRINK,
      itemPrice: 5,
      imgSrc: "/img/Corn-Beer.png"
    },
    {
      id: 7,
      itemName: "Corn Pudding",
      itemType: DESSERT,
      itemPrice: 6,
      imgSrc: "/img/Corn-Pudding.jpg"
    },
    {
      id: 8,
      itemName: "Sweet Corn Cake",
      itemType: DESSERT,
      itemPrice: 6,
      imgSrc: "/img/Sweet-Corn-Cake.jpg"
    }
  ];

  const tempCart = [
    { 
      itemId: 1,
      counter: 0
    },
    { 
      itemId: 2,
      counter: -1
    },
    {
      itemId: 3,
      counter: 3
    },
    {     
      itemId: 4,
      counter: 2
    },   
  ];

  const routes = (
    <Routes>
      <Route 
        path="/" 
        element={ 
          <Home/> 
        }
      />
      <Route 
        path="/about" 
        element={ 
          <About/> 
        }
      />
      <Route 
        path="/login" 
        element={ 
          <Login/> 
        }
      />
      <Route 
        path="/register" 
        element={ 
          <Register/> 
        }
        exact
      />     
      <Route 
        path="/validate/:userId" 
        element={
          <ValidateReg/>
        }
        exact        
      />
      <Route 
        path="/request-reset-pass" 
        element={ 
          <RequestResetPass/>
        }
      />
      <Route 
        path="/do-reset-pass/:userIdParam/:codeParam" 
        element={ 
          <DoResetPwd 
            users={tempUsers} 
            tokens={tempPwdResetTokens} 
            exact/> 
        } 
        exact
      />
      <Route 
        path="/account" 
        element={ 
          <PrivateRoute
            redirect={"/login"}>
            <Account/>
          </PrivateRoute>        
        }
      />
      <Route 
        path="/menu" 
        element={
          <Menu 
            items={tempItems} 
            cart={tempCart}/> 
        }
      />
      <Route 
        path="/cart" 
        element={ 
          <Cart 
            items={tempItems} 
            cart={tempCart}/>
        } 
      />
      <Route
        path="/success"
        element={
          <Success/>        
        }
      />
      <Route 
        path="*" 
        element={ 
          <Navigate 
            to="/" 
            replace/>
        } 
      />
    </Routes>
  );

  const { fetchingUser } = useGlobalContext();  
  return  (
    <GlobalProvider>
      { fetchingUser ?
        <Router>
          <NavBar/>
          {routes}
        </Router>
      :
      <Loading/> }
    </GlobalProvider>  
  )
}

export default App;
