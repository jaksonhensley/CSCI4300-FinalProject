import React, { useState } from "react";
import { Link } from "react-router-dom";

import { SIGNIN, CHANGEPASS, REGISTER } from "./AuthMode";
import "./Auth.css";
import "../../shared/style/common.css";

const Auth = ({authmode}) => {
  const [mode, setMode] = useState(authmode);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = (e) => {
    console.log("Clicked login button");
    e.preventDefault();
  };

  const handleRegister = (e) => {
    console.log("Clicked register button");

    e.preventDefault();
  };

  const RenderSignin = () => {
    return (
      <div className="login-container">
        <form className="login-form">
          <div className="login-content">
            <h3 className="login-form-title">Sign in</h3>
            <div className="text-center">
              Not registered?{" "}
              <span className="link-primary" onClick={() => setMode(REGISTER)}>Register</span>
            </div>
            <div className="text-center form-group mt-3">
              <label>
                Username
                <input 
                  type="text" 
                  value={username} 
                  className="form-control mt-1"
                  placeholder="Enter your username..."
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
            </div>
            <div className="text-center form-group mt-3">
              <label>
                Password
                <input 
                  type="password" 
                  value={password} 
                  className="form-control mt-1"
                  placeholder="Enter your password..."
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>      
            <div className="text-center mt-3">
              <button type="submit" className="login-button" onClick={handleLogin}>
                Login
              </button>
            </div>      
            <div>
              <p className="text-center mt-2">
                Forgot <span className="link-primary" onClick={() => setMode(CHANGEPASS)}>password?</span>
              </p>
            </div>       
          </div>
        </form>
      </div>      
    );
  };

  const RenderRegister = () => {
    return (
      <div className="login-container">
        <form className="login-form">
          <div className="login-form-content">
            <h3 className="login-form-title">Register</h3>
            <div className="text-center">
              Already registered?{" "}
              <span className="link-primary" onClick={() => setMode(SIGNIN)}>
                Sign In
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                type="text"
                value={username}
                className="form-control mt-1"
                placeholder="Enter the username you want..."
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                value={email}
                className="form-control mt-1"
                placeholder="Email address..."
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                value={password}
                className="form-control mt-1"
                placeholder="Password..."
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Confirm Password</label>
              <input 
                type="password"
                value={confirmPassword}
                className="form-control mt-1"
                placeholder="Confirm password..."
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>                                                
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="login-button">
                Register
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <span className="link-primary" onClick={() => setMode(CHANGEPASS)}>password?</span>
            </p>
          </div>
        </form>
      </div>
    );
  };

  const RenderChangePass = () => {
    return (
      <div>

      </div>
    );
  };

  if (mode === SIGNIN) {
    return <RenderSignin/>;
  } else if (mode === REGISTER) {
    return <RenderRegister/>;
  } else if (mode === CHANGEPASS) {
    return <RenderChangePass/>;
  }
};

Auth.defaultProps = {
  authmode: SIGNIN
};

export default Auth;