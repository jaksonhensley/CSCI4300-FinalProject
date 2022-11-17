import React from "react";

import { LOGIN } from "../AuthMode";
import "../Auth.css";

const RequestResetPass = ({
    setMode, 
    email, 
    setEmail, 
    handleRequestResetPass
  }) => {
  return (
    <div className="login-container">
      <form className="login-form">
        <div className="login-form-content">
          <h3 className="login-form-title">Reset Password</h3>
          <div className="text-center">
            Cancel resetting password?{" "}
            <span className="link-primary" onClick={() => setMode(LOGIN)}>
              Login
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="text"
              value={email}
              className="form-control mt-1"
              placeholder="Enter your email..."
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>                                                       
          <div className="d-grid gap-2 mt-3">
            <button className="account-btn" onClick={handleRequestResetPass}>
              Send Me a Link
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

  export default RequestResetPass;