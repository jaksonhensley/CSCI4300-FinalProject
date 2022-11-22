import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import "./Auth.css";
import "../../shared/style/common.css";

const ValidateReg = () => {
  const VER_STATE_1 = "verifying";
  const VER_STATE_2 = "verified";
  const VER_STATE_3 = "failed";

  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(VER_STATE_1);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { userId } = useParams();  

  console.log("User id: " + userId);

  const handleVerify = async () => {
    setLoading(true);
    console.log("Verifying");
    await axios.put(`/api/auth/validate`, { userId })
    .then(() => {
      setVerifying(VER_STATE_2);
    })
    .catch((err) => {
      setVerifying(VER_STATE_3);
      console.log(err);
      if (err?.response?.data) {
        setErrors(err.response.data);
      }
    })
  };

  if (verifying === VER_STATE_1) {
    return (
      <div className="login-container">
        <button 
          className="account-btn" 
          disabled={loading} 
          onClick={handleVerify}>
            Click me to verify your account
        </button>
      </div>
    );
  } else if (verifying === VER_STATE_2) {
    return (
      <div className="login-container">
        <div className="login-form">
          <div className="login-form-content">
            <h1 className="big-white-heading">Hooray!</h1>
            <div className="text-center">
              <p >Your account is now verified.</p>
              <span 
                className="link-primary" 
                onClick={() => navigate("/login")}>
                  Go to login
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (verifying === VER_STATE_3) {
    return (
      <div className="login-container">
        <h1 className="error">ERROR: Failed to verify account!</h1>
        <p>{errors}</p>
      </div>
    );
  }
};

export default ValidateReg;