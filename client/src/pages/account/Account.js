import { Table, Button } from "react-bootstrap";

import "./Account.css";
import "../../shared/style/common.css";

const Account = () => {
  const userId = 1;
  const email = "johndoe@email.com";
  const username = "johnnybravo69";

  return (  
    <div className="account-tables-container">
      <Table bordered striped>
        <thead>
          <th>
            <span className="table-title">Profile</span>
          </th>
        </thead>
        <tbody className="profile-text">
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
      <Table bordered striped>
        <thead>
          <th>
            <span className="table-title">Actions</span>
          </th>
        </thead>
        <tbody>
          <tr>
            <td>
              <Button to={"/orders/" + userId}>
                View Orders
              </Button>
            </td>
          </tr>
          <tr>          
            <td>
              <Button to="/reset-pass">
                Reset Password
              </Button>  
            </td>            
          </tr>          
        </tbody>
      </Table>      
    </div>
  );
};

export default Account;