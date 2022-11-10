import React from "react";

import { REGISTER, REQUEST_RESET_PASS } from "../AuthMode";

const Login = ({
    setMode, 
    username, 
    setUsername, 
    password, 
    setPassword, 
    handleLogin
  }) => {
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
            <button type="submit" className="button-primary button-primary-green" onClick={handleLogin}>
              Login
            </button>
          </div>      
          <div>
            <p className="text-center mt-2">
              Forgot <span className="link-primary" onClick={() => setMode(REQUEST_RESET_PASS)}>password?</span>
            </p>
          </div>       
        </div>
      </form>
    </div>   
  );
};

  export default Login;
