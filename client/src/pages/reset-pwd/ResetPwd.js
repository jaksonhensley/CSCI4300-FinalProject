import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import ErrorModal from "../error/ErrorModal";

import "./ResetPwd.css";
import "../../shared/style/common.css";
import axios from "axios";

const ResetPwd = () => {
  const [newPwd, setNewPwd] = useState("");
  const [newPwdConfirm, setNewPwdConfirm] = useState("");  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { userId, token } = useParams();

  // If no reset token exists with the given user id and token, then navigate to the error page
  useEffect(() => {
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
  }, [userId, token, navigate]);

  // Processes request to change password. If there are errors, then set the errors state. 
  // Otherwise, navigate to success page.
  const handleChangePwd = async (e) => {
    e.preventDefault();
    console.log("New pwd: " + newPwd);
    console.log("New pwd confirm: " + newPwdConfirm);
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
  };

  // If there are errors, then display them in a modal the user is forced to have to close before proceeding
  if (errors.length > 0) {
    return (
      <ErrorModal 
        msg="Password does not match confirmation!" 
        onClose={() => setErrors({})}/>
    );
  }

  return (
    <div className="container">
      <form className="form">
        <div className="form-content">
          <h3 className="form-title">Change Password</h3>
          <div className="text-center form-group mt-3">
            <label>
              New Password
              <input
                type="password"
                value={newPwd}
                className="form-control mt-1"
                placeholder="Enter your new password..."
                onChange={(e) => setNewPwd(e.target.value)}
              />
            </label>
          </div>
          <div className="text-center form-group mt-3">
            <label>
              <input
                type="password"
                value={newPwdConfirm}
                className="form-control mt-1"
                placeholder="Confirm your new password..."
                onChange={(e) => setNewPwdConfirm(e.target.value)}
              />
            </label>
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

export default ResetPwd;