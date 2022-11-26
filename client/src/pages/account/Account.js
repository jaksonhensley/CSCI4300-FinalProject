import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../shared/context/GlobalContext";
import { Table } from "react-bootstrap";

import "./Account.css";
import "../../shared/style/common.css";

const Account = () => {
  const { user, logout } = useGlobalContext();
  const navigate = useNavigate();  

  useEffect(() => {
    if (!user && navigate) {
      navigate("/login");
    }
  }, [user, navigate]); 

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/success", {
        state: {
          message: "Successfully logged out"
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (  
    <div className="account-tables-container">
      <span className="account">
        Account
      </span>
      <Table>
        <thead>
          <tr>
            <td>
              <span className="table-title">Profile</span>
            </td>        
          </tr>
        </thead>      
        <tbody>
          <tr>
            <td>
              <span className="profile-text">Email:</span>
            </td>
            <td>
              <span className="profile-text">{user.email}</span>
            </td>
          </tr>
        </tbody>
      </Table>
      <Table>
        <thead>
          <tr>
            <td>
              <span className="table-title">Actions</span>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>          
            <td>
              <button 
                className="button-primary button-primary-red"
                onClick={() => navigate("/reset-pwd")}>
                  Reset Password
              </button>  
            </td>    
          </tr>      
          <tr>
            <td>
              <button 
                className="button-primary button-primary-red"
                onClick={handleLogout}>
                  Logout
              </button>
            </td>
          </tr>    
        </tbody>
      </Table>      
    </div>
  );
};

export default Account;