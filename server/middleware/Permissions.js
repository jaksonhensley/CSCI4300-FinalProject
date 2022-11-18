const { User } = require("../models/User");
const jwt = require("jsonwebtoken");

const requiresAuth = async (req, resp, next) => {
  const token = req.cookies["access-token"];
  console.log(token);
  let isAuthorized = false;
  
  if (token) {
    console.log("Token is present");
    try {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(userId);      
      if (user) {
        console.log("Found user by id");
        const userToReturn = { ...user._doc };
        delete userToReturn.password;
        req.user = userToReturn;
        isAuthorized = true;
      }       
    } catch (err) {
      console.log(err);
    }
  } 

  console.log("Is authorized: " + isAuthorized);
  if (isAuthorized) {
    return next();
  } else {
    return resp.status(401).send("Unauthorized");
  }
};

module.exports = requiresAuth;