import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Account from "./pages/account/Account";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ValidateReg from "./pages/auth/ValidateReg";
import RequestResetPwd from "./pages/auth/RequestResetPwd";
import ResetPwd from "./pages/reset-pwd/ResetPwd";
import Menu from "./pages/menu/Menu";
import Cart from "./pages/cart/Cart";
import Reviews from "./pages/reviews/Reviews";
import WriteReview from "./pages/write-review/WriteReview";

import NavBar from "./shared/components/nav/NavBar";
import Loading from "./shared/components/loading/Loading";
import Success from "./shared/components/success/Success";
import Error from "./shared/components/error/Error";
import PrivateRoute from "./shared/components/PrivateRoute";

import { GlobalProvider } from "./shared/context/GlobalContext";
import { useGlobalContext } from "./shared/context/GlobalContext";

const App = () => {  
  const routes = (
    <Routes>
      <Route 
        path="/" 
        element={ 
          <Home/> 
        }
        exact
      />
      <Route 
        path="/about" 
        element={ 
          <About/> 
        }
        exact
      />
      <Route 
        path="/login" 
        element={ 
          <Login/> 
        }
        exact
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
        exact
      />
      <Route
        path="/reset-pwd"
        element={
          <ResetPwd/>
        }
        exact
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
        exact
      />
      <Route 
        path="/menu" 
        element={
          <Menu/> 
        }
        exact
      />
      <Route
        path="/reviews/:itemId"
        element={
          <Reviews/>
        }
        exact
      />
      <Route
        path="/write-review/:itemId"
        element={
          <PrivateRoute
            redirect={"/login"}>
              <WriteReview/>
          </PrivateRoute>
        }
        exact
      />
      <Route 
        path="/cart" 
        element={ 
          <PrivateRoute
            redirect={"/login"}>
              <Cart/>
          </PrivateRoute>
        } 
        exact
      />
      <Route
        path="/success"
        element={
          <Success/>        
        }
        exact
      />
      <Route
        path="/error"
        element={
          <Error/>
        }
        exact
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
