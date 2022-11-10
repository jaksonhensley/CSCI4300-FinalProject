import React from "react";
import { useParams } from "react-router-dom";

const DoResetPass = () => {
  let {email, token} = useParams();
  console.log("Do request password page. Email: " + email + ". Token: " + token);
  return (
    <div>
      Do reset password
    </div>
  );
};

export default DoResetPass;