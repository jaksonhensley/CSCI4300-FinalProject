import React, { useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const ValidateReg = () => {
  const VER_STATE_1 = "verifying";
  const VER_STATE_2 = "verified";
  const VER_STATE_3 = "failed";

  const [verifying, setVerifying] = useState(VER_STATE_1);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { userId } = useParams();  

  console.log("User id: " + userId);

  const handleVerify = async () => {
    setLoading(true);
    console.log("Verifying");
    await axios.put(`/api/auth/validate`, { userId })
    .then(() => {
      setVerifying(VER_STATE_2);
    })
    .catch((err) => {
      setVerifying(VER_STATE_3);
      console.log(err);
      if (err?.response?.data) {
        setErrors(err.response.data);
      }
    })
  };

  if (verifying === VER_STATE_1) {
    return (
      <div>
        <button disabled={loading} onClick={handleVerify}>
          Click me to verify your account
        </button>
      </div>
    );
  } else if (verifying === VER_STATE_2) {
    return (
      <div>
        <h1>Hooray!</h1>
        <p>Your account is now verified.</p>
        <Link to="/login">Go to login</Link>
      </div>
    );
  } else if (verifying === VER_STATE_3) {
    return (
      <div>
        <h1>ERROR: Failed to verify account!</h1>
        <p>{errors}</p>
      </div>
    );
  }
};

export default ValidateReg;