import React, { useState } from "react";

import Login from "./fragments/Login";
import Register from "./fragments/Register";
import RequestResetPass from "./fragments/RequestResetPassword";

import { LOGIN, REQUEST_RESET_PASS, REGISTER } from "./AuthMode";
import "./Auth.css";
import "../../shared/style/common.css";

const Auth = ({authmode}) => {
  const [mode, setMode] = useState(authmode);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetAll = () => {
    setEmail("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleLogin = (e) => {
    console.log("Clicked login button");
    resetAll();
    e.preventDefault();
  };

  const handleRegister = (e) => {
    console.log("Clicked register button");
    resetAll();
    e.preventDefault();
  };

  const handleRequestResetPass = (e) => {
    console.log("Clicked button to request a password reset token");
    resetAll();
    e.preventDefault();
  };

  if (mode === LOGIN) {
    return <Login
        setMode={setMode}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />;
  } else if (mode === REGISTER) {
    return <Register
        setMode={setMode}
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        handleRegister={handleRegister}
      />;
  } else if (mode === REQUEST_RESET_PASS) {
    return <RequestResetPass
        setMode={setMode}
        email={email}
        setEmail={setEmail}
        handleRequestResetPass={handleRequestResetPass}
      />;
  } 
};

Auth.defaultProps = {
  authmode: LOGIN
};

export default Auth;