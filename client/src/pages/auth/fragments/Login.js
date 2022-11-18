import React from "react";

import { REGISTER, REQUEST_RESET_PASS } from "../AuthMode";
import "../Auth.css";

const Login = ({
    setMode, 
    email, 
    setEmail, 
    password, 
    setPassword, 
    handleSubmit,
    errors,
    loading
  }) => {
  return (
    <div className="login-container">
      <form className="login-form">
        <div className="login-form-content">
          <h3 className="login-form-title">Sign in</h3>
          <div className="text-center">
            Not registered?{" "}
            <span className="link-primary" onClick={() => setMode(REGISTER)}>Register</span>
          </div>
          <div className="text-center form-group mt-3">
            <label>
              Email
              <input 
                type="text" 
                value={email} 
                className="form-control mt-1"
                placeholder="Enter your email..."
                onChange={(e) => setEmail(e.target.value)}
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
            <button type="submit" className="account-btn" disabled={loading} onClick={handleSubmit}>
              Login
            </button>
          </div>      
          <div>
            <p className="text-center mt-2">
              Forgot <span className="link-primary" onClick={() => setMode(REQUEST_RESET_PASS)}>password?</span>
            </p>
            {
              errors.error &&
              <div>
                <hr/>
                <p className="error">{errors.error}</p>
              </div>
            }            
          </div>       
        </div>
      </form>
    </div>   
  );
};

  export default Login;
