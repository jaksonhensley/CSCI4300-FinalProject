import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useGlobalContext } from "../../shared/context/GlobalContext";

import Login from "./fragments/Login";
import Register from "./fragments/Register";
import RequestResetPass from "./fragments/RequestResetPassword";

import { LOGIN, REQUEST_RESET_PASS, REGISTER } from "./AuthMode";
import "./Auth.css";
import "../../shared/style/common.css";

const Auth = ({modeProp}) => {
  const { getCurrentUser, user } = useGlobalContext();
  const [mode, setMode] = useState(modeProp);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && navigate) {
      navigate("/account");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => { 
    e.preventDefault();  
    setLoading(true);      

    let data = {};
    let url = "/api/auth/";

    console.log("Email: " + email);
    console.log("Password: " + password);

    if (mode === LOGIN) {
      data = {
        email,
        password
      };  
      url += "login";      
    } else if (mode === REGISTER) {
      data = {
        email,
        password,
        confirmPassword
      };
      url += "register";
    } else if (mode === REQUEST_RESET_PASS) {
      data = {
        email
      };
      url += "request-reset-pass";
    }

    console.log("Auth url: " + url);

    await axios.post(url, data)
    .then(() => {
      getCurrentUser();
    })
    .catch((err) => {
      setLoading(false);

      if (err?.response?.data) {
        setErrors(err.response.data);
      }
    });
  };

  if (mode === LOGIN) {
    return <Login
        setMode={setMode}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        errors={errors}
        loading={loading}
      />;
  } else if (mode === REGISTER) {
    return <Register
        setMode={setMode}    
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        handleSubmit={handleSubmit}
        errors={errors}
        loading={loading}
      />;
  } else if (mode === REQUEST_RESET_PASS) {
    return <RequestResetPass
        setMode={setMode}
        email={email}
        setEmail={setEmail}
        handleSubmit={handleSubmit}
        errors={errors}
        loading={loading}
      />;
  } 
};

Auth.defaultProps = {
  modeProp: LOGIN
};

export default Auth;