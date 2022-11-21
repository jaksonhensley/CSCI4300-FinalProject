import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import ErrorModal from "../error/ErrorModal";

import "./DoResetPwd.css";
import "../../shared/style/common.css";
import axios from "axios";

const DoResetPwd = () => {
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
      const { success } = await axios.get("/api/pwd/reset-pwd-token-exists", {
        userId,
        token      
      });

      // success should be of type boolean
      console.log(typeof data);
      console.log(success);    

      // if no success, then there is no password reset token with matching user id or token fields,
      // in which case navigate to error page
      if (!success) {
        console.log("Navigating to error page");
        navigate("/error", {
          state: {
            message: "No password reset token found!"
          }
        });
      }
    })();
  }, [userId, token, navigate]);

  // Processes request to change password. If there are errors, then set the errors state. 
  // Otherwise, navigate to success page.
  const handleChangeUserPwd = async (e) => {
    e.preventDefault();
    console.log("New pwd: " + newPwd);
    console.log("New pwd confirm: " + newPwdConfirm);

    await axios.post("/api/pwd/do-reset-password", {
      userId: userId,
      newPwd: newPwd,
      newPwdConfirm: newPwdConfirm      
    })
    .then(() => {
      navigate("/success", {
        state: {
          message: "Successfully changed password!"
        }
      });
    })
    .catch((err) => {
      setLoading(false);
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
      <div className="form">
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
              onClick={(e) => handleChangeUserPwd(e)}>
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoResetPwd;