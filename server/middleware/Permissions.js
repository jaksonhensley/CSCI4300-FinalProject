const { User } = require("../models/User");
const jwt = require("jsonwebtoken");

const requiresAuth = async (req, resp, next) => {
  // return 401 "Unauthorized" on failure
  const fail = (err) => {    
    return resp.status(401).send("Unauthorized: " + err);
  };

  // called when user should be reset
  const resetUser = async (userId) => {
    console.log("Reset user:");
    const resetUser = await User.findByIdAndUpdate(userId, {
      jwtToken: "NULL",
      jwtExpire: undefined
    }, {
      new: true
    });
    console.log(resetUser);
  };

  const jwtToken = req.cookies["access-token"];
  console.log(jwtToken);
  if (!jwtToken) {
    console.log("No jwt token present");
    return fail("No jwt token present");
  }

  try {
    const { userId } = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const user = await User.findById(userId);
    console.log(user);

    /*
    user must be defined
    user must have defined jwt token
    user jwt token must not be equal to "NULL"
    user must have defined jwt expiration field
    jwt token must be equal to user jwt token
    user jwt expiration must be after Date.now()
    */
    if (!user || 
        !user.jwtToken || 
        user.jwtToken === "NULL" || 
        !user.jwtExpire || 
        jwtToken !== user.jwtToken || 
        new Date() >= user.jwtExpire) {
      throw "Invalid jwt state";
    }
    // user passes authentication
    const userToReturn = { ...user._doc };
    delete userToReturn.password;
    req.user = userToReturn;
    return next();
  } catch (err) {  
    console.log(err);    
    resp.clearCookie("access-token");
    resetUser();   
    return fail(err);
  }
};

module.exports = { requiresAuth };