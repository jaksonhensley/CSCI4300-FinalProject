import React from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

import "./Account.css";
import "../../shared/style/common.css";

const Account = () => {
  const email = "johndoe@email.com";
  const username = "johnnybravo69";

  const Orders = () => {
    return (
      <div>
        <span>Orders here</span>
        <button>View Order</button>
        <button>Request Refund</button>
      </div>
    );
  };

  return (
    <div className="account-container">
      <div className="container">
        <h1>Profile</h1>      
        <div>
          <Table className="center-table" striped bordered variant="dark">       
            <tbody>
              <tr>
                <td>Email:</td>
                <td>{email}</td>
              </tr>
              <tr>
                <td>Username:</td>
                <td>{username}</td>
              </tr>
            </tbody>
          </Table>                    
        </div>
      </div> 
      <div className="line"/>
      <div className="container">
        <h1>Account</h1>              
        <div>
          <Table className="center-table" striped bordered variant="dark">       
            <tbody>
              <tr>
                <td className="text-center">
                  <Link className="button-primary button-primary-red" to="/reset-pass">
                    Reset Password
                  </Link>                 
                </td>
              </tr>
            </tbody>
          </Table>                    
        </div>
      </div>
      <div className="line"/>
      <div className="container">
        <h1>Orders</h1>
        <Orders/>
      </div>
    </div>
  );
};

export default Account;