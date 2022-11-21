import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./Auth.css";

const RequestResetPwd = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();  
    setLoading(true);      
    console.log("Email: " + email);
    await axios.post("/api/pwd/request-reset-pwd", { 
      email 
    })
    .then(() => {
      navigate("/success", {
        state: {
          message: "An email has been sent to " + email + " with further steps for resetting your password."
        }
      });
    })
    .catch((err) => {
      setLoading(false);
      if (err?.response?.data) {
        setErrors(err.response.data);
      }
    });
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <div className="login-form-content">
          <h3 className="login-form-title">Reset Password</h3>
          <div className="text-center">
            Cancel resetting password?{" "}
            <span className="link-primary" onClick={() => navigate("/login")}>
              Login
            </span>
          </div>
          <div className="form-group mt-3">
            <label>
              <span className="text">
                Email address
              </span>
            </label>
            <input
              type="text"
              value={email}
              className="form-control mt-1"
              placeholder="Enter your email address..."
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>                                                       
          <div className="d-grid gap-2 mt-3">
            <button className="account-btn" disabled={loading} onClick={handleSubmit}>
              Send Me a Link
            </button>             
          </div>
          <div>
            {
              errors.error &&
              <div>
                <hr/>
                <p className="error">
                  {errors.error}
                </p>
              </div>
            } 
          </div>
        </div>
      </form>
    </div>
  );
};

  export default RequestResetPwd;