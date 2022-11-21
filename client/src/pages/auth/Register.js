import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useGlobalContext } from "../../shared/context/GlobalContext";
import "./Auth.css";

const Register = () => {
  const { user } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && navigate) {
      console.log("User logged in, redirect to account");
      navigate("/account");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();  
    setLoading(true);      
    console.log("Email: " + email);
    console.log("Password: " + password);
    console.log("Confirm password: " + confirmPassword);
    await axios.post("/api/auth/register", {
      email,
      password,
      confirmPassword
    })
    .then(() => {
      let message = "An email has been sent to " + email + " with steps that must be completed before you may login.";
      navigate("/success", {
        state: {
          message: message
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
          <h3 className="login-form-title">Register</h3>
          <div className="text-center">          
            Already registered?{" "}
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
              type="email"
              value={email}
              className="form-control mt-1"
              placeholder="Enter an email address..."
              onChange={(e) => setEmail(e.target.value)}
            />
            {
              errors.email &&
              <p className="error">{errors.email}</p>              
            }
          </div>
          <div className="form-group mt-3">
            <label>
              <span className="text">
                Password
              </span>
            </label>
            <input
              type="password"
              value={password}
              className="form-control mt-1"
              placeholder="Enter a password..."
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {
            errors.password &&
            <p className="error">{errors.password}</p>
          }
          <div className="form-group mt-3">
            <label>
              <span className="text">
                Confirm password
              </span>
            </label>
            <input 
              type="password"
              value={confirmPassword}
              className="form-control mt-1"
              placeholder="Confirm your password..."
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {
              errors.confirmPassword && 
              <p className="error">{errors.confirmPassword}</p>
            }
          </div>                                                
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="account-btn" disabled={loading} onClick={handleSubmit}>
              Register
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
              <p className="error">
                {errors.error}
              </p>
            }  
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;