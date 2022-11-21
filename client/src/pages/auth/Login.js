import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useGlobalContext } from "../../shared/context/GlobalContext";

import "./Auth.css";

const Login = () => {
  const { getCurrentUser, user } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Login component");
    console.log("User: " + user);
    if (user !== null && navigate) {
      console.log("User logged in, redirect to account");
      navigate("/account");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();  
    setLoading(true);      
    console.log("Email: " + email);
    console.log("Password: " + password);
    await axios.post("/api/auth/login", {
      email,
      password
    })
    .then(() => {
      getCurrentUser();      
    })
    .catch((err) => {
      setLoading(false);
      console.log(err);
      if (err?.response?.data) {
        setErrors(err.response.data);
      }
    });
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <div className="login-form-content">
          <h3 className="login-form-title">Sign in</h3>
          <div className="text-center">
            Not registered?{" "}
            <span className="link-primary" onClick={() => navigate("/register")}>Register</span>
          </div>
          <div className="text-center form-group mt-3">
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
          <div className="text-center form-group mt-3">
            <label>
              <span className="text">
                Password
              </span>
            </label>
            <input 
              type="password" 
              value={password} 
              className="form-control mt-1"
              placeholder="Enter your password..."
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>      
          <div className="text-center mt-3">
            <button type="submit" className="account-btn" disabled={loading} onClick={handleSubmit}>
              Login
            </button>
          </div>      
          <div>
            <p className="text-center mt-2">
              Forgot <span className="link-primary" onClick={() => navigate("/request-reset-pwd")}>password?</span>
            </p>                      
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

  export default Login;
