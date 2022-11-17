const { User } = require("../models/User");
const jwt = require("jsonwebtoken");

const requiresAuth = async (req, resp, next) => {
  const token = req.cookies["access-token"];
  let isAuthed = false;
  
  if (token) {
    try {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(userId);
      if (user) {
        const userToReturn = { ...user._doc };
        delete userToReturn.password;
        req.user = userToReturn;
        isAuthed = true;
      }       
    } catch (err) {
      console.log(err);
    }
  } 

  if (isAuthed) {
    return next();
  } else {
    return resp.status(401).send("Unauthorized");
  }
};

module.exports = requiresAuth;