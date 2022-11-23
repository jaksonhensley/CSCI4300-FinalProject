import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useGlobalContext } from "../../shared/context/GlobalContext";

import "./ResetPwd.css";
import "../../shared/style/common.css";

const ResetPwd = () => {
  const [newPwd, setNewPwd] = useState("");
  const [newPwdConfirm, setNewPwdConfirm] = useState("");  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { user } = useGlobalContext();
  const { userId, token } = useParams();

  // If user is not logged in and no reset token exists with the given user id and token, then navigate to the error page
  useEffect(() => {
    if (!user) {
      console.log("Use effect: check if pwd reset token exists");
      console.log(userId);
      console.log(token);
      (async () => {
        await axios.get("/api/pwd/reset-pwd-token-exists", {
          userId,
          token      
        })
        .catch((err) => {
          console.log(err);
          console.log("Navigating to error page");
          navigate("/error", {
            state: {
              message: "Failed to load page for resetting your password!"
            }
          });
        });    
      })();
    }
  }, [user, userId, token, navigate]);

  // Processes request to change password. If there are errors, then set the errors state. 
  // Otherwise, navigate to success page.
  const handleChangePwd = async (e) => {
    e.preventDefault();
    console.log("New pwd: " + newPwd);
    console.log("New pwd confirm: " + newPwdConfirm);

    // if logged in, use logged in route, otherwise use anonymous route which requires token
    if (user) {
      await axios.post("/api/pwd/reset-pwd-logged-in", {
        password: newPwd,
        confirmPassword: newPwdConfirm
      })
      .then(() => {
        console.log("Navigating to success page");
        navigate("/success", {
          state: {
            message: "Successfully changed password!"
          }
        });
      })
      .catch((err) => {
        setLoading(false);     
        console.log("Errors");
        console.log(err);
        if (err?.response?.data) {
          setErrors(err.response.data);
        }
      });
    } else {
      await axios.post("/api/pwd/reset-pwd", {
        userId: userId,
        token: token,
        password: newPwd,
        confirmPassword: newPwdConfirm      
      })
      .then(() => {
        console.log("Navigating to success page");
        navigate("/success", {
          state: {
            message: "Successfully changed password!"
          }
        });
      })
      .catch((err) => {      
        setLoading(false);     
        console.log("Errors");
        console.log(err);
        if (err?.response?.data) {
          setErrors(err.response.data);
        }
      });
    }
  };

  return (
    <div className="container">
      <form className="form">
        <div className="form-content">
          <h3 className="form-title">Change Password</h3>
          <div className="text-center form-group mt-3">
            <label>
              New Password
            </label>
            <input
              type="password"
              value={newPwd}
              className="form-control mt-1"
              placeholder="Enter your new password..."
              onChange={(e) => setNewPwd(e.target.value)}
            />    
            {
              errors.password &&         
              <p className="red-text">{errors.password}</p>         
            }         
          </div>
          <div className="text-center form-group mt-3">
            <label>
              Confirm New Password
            </label>
            <input
              type="password"
              value={newPwdConfirm}
              className="form-control mt-1"
              placeholder="Confirm your new password..."
              onChange={(e) => setNewPwdConfirm(e.target.value)}
            />
            {
              errors.confirmPassword &&         
              <p className="red-text">{errors.confirmPassword}</p>         
            } 
          </div>
          <div className="text-center mt-3">
            <button 
              type="submit" 
              className="button-primary button-primary-green" 
              disabled={loading}
              onClick={(e) => handleChangePwd(e)}>
              Change Password
            </button>            
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResetPwd;