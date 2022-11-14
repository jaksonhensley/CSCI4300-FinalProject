import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import ErrorModal from "../error/ErrorModal";

import "./DoResetPwd.css";
import "../../shared/style/common.css";

const DoResetPwd = ({users, tokens}) => {
  const [usersState, setUsersState] = useState(users);
  const [tokensState, setTokensState] = useState(tokens);
  const [newPwd, setNewPwd] = useState("");
  const [newPwdConfirm, setNewPwdConfirm] = useState("");
  const [isError, setIsError] = useState(false);
  const [isPwdChangeSuccess, setIsPwdChangeSuccess] = useState(false);

  const { userIdParam, codeParam } = useParams();

  let isLoggedIn = false;

  if (isPwdChangeSuccess) {
    return (
      <div>
        <h1 className="text-center">Password successfully changed!</h1>       
        {!isLoggedIn &&
          <Link to="/login">
            <span className="button-primary button-primary-green">Go to Login</span>
          </Link>       
        }
      </div>
    );
  }  

  const existsUserById = (id) => {
    let b = usersState.some((user) => user.id === id);
    console.log("Exists user by id: " + b);
    return b;
  };

  const existsTokenByUserIdAndCode = (id, code) => {
    let b = tokensState.some((token) => token.userId === id && token.code === code);
    console.log("Exists token by user id and code: " + b);
    return b;
  };

  const tempEncryptFunc = (pwd) => {
    return pwd;
  };

  const handleChangeUserPwd = (e, id) => {
    console.log("New pwd: " + newPwd);
    console.log("New pwd confirm: " + newPwdConfirm);
    if (newPwd !== newPwdConfirm) {
      setIsError(true);
    } else {
      const updatedUsers = usersState.map((user) => {
        if (user.id === id) {
          const newPwdEncrypted = tempEncryptFunc(newPwd);
          return {...user, password: newPwdEncrypted};
        }
        return user;
      });
      setUsersState(updatedUsers);
      const updatedTokens = tokensState.filter((token) => token.userId !== id);
      setTokensState(updatedTokens);
      setIsPwdChangeSuccess(true);
    }
    setNewPwd("");
    setNewPwdConfirm("");
    e.preventDefault();
  };

  const onCloseErrorModal = () => {
    setIsError(false);
  };

  if (!existsUserById(+userIdParam) || !existsTokenByUserIdAndCode(+userIdParam, codeParam)) {
    console.log("id param: " + userIdParam);
    console.log("token param: " + codeParam);
    return (
      <div>
        <h1>ERROR: Bad vals</h1>
      </div>
    );
  }

  if (isError) {
    return <ErrorModal msg="Password does not match confirmation!" onClose={onCloseErrorModal}/>
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
              onClick={(e) => handleChangeUserPwd(e, +userIdParam)}>
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoResetPwd;