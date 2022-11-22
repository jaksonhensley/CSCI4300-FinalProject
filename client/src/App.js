import React, { useState } from "react";
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
import RequestResetPwd from "./pages/auth/RequestResetPwd";
import ResetPwd from "./pages/reset-pwd/ResetPwd";
import Menu from "./pages/menu/Menu";
import Cart from "./pages/cart/Cart";
import Loading from "./shared/components/loading/Loading";
import Success from "./shared/components/success/Success";
import Error from "./shared/components/error/Error";

import { GlobalProvider } from "./shared/context/GlobalContext";
import { useGlobalContext } from "./shared/context/GlobalContext";
import PrivateRoute from "./shared/components/PrivateRoute";
import ValidateReg from "./pages/auth/ValidateReg";

const App = () => {  
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
        path="/request-reset-pwd" 
        element={ 
          <RequestResetPwd/>
        }
      />
      <Route 
        path="/reset-pwd/:userId/:token" 
        element={ 
          <ResetPwd/> 
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
          <Menu/> 
        }
      />
      <Route 
        path="/cart" 
        element={ 
          <Cart/>
        } 
      />
      <Route
        path="/success"
        element={
          <Success/>        
        }
      />
      <Route
        path="/error"
        element={
          <Error/>
        }
      />
      <Route 
        path="*" 
        element={ 
          <Navigate 
            to="/" 
            replace
          />
        } 
      />
    </Routes>
  );

  const { fetchingUser } = useGlobalContext();  
  return  (
    <GlobalProvider>
      { 
        fetchingUser ?
          <Loading/>
        :
          <Router>
            <NavBar/>
            {routes}
          </Router>
      }
    </GlobalProvider>  
  )
}

export default App;
