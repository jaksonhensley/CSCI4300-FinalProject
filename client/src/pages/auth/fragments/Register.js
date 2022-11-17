import React from "react";
import { LOGIN, REQUEST_RESET_PASS } from "../AuthMode";
import "../Auth.css";

const Register = ({
    setMode,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleRegister,
  }) => {
  return (
    <div className="login-container">
      <form className="login-form">
        <div className="login-form-content">
          <h3 className="login-form-title">Register</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={() => setMode(LOGIN)}>
              Login
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
            <button type="submit" className="account-btn" onClick={handleRegister}>
              Register
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <span className="link-primary" onClick={() => setMode(REQUEST_RESET_PASS)}>password?</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;