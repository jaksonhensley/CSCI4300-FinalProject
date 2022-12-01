const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

const { requiresAuth } = require("../middleware/Permissions");
const { validateRegisterInput } = require("../validation/RegisterValidation");
const { sendMail } = require("../mailer/Mailer");
const { addHoursToDate } = require("../const/Funcs");
const { isEmpty } = require("../validation/isEmpty");
const FRONTEND_HEADER = require("../const/FrontendHeader");

const { User } = require("../models/User");

// @route     POST /api/auth/register
// @desc      Register new user account
// @access    Public
router.post("/register", async (req, resp) => {
  try {    
    // validate registration input
    let errs = {};
    validateRegisterInput(req.body, errs);
    if (!isEmpty(errs)) {
      console.log(errs);
      return resp.status(400).json(errs);
    }

    // check that user with same email does not already exist
    const existsByEmail = await User.exists({
      email: new RegExp("^" + req.body.email + "$", "i")
    });
    if (existsByEmail) {
      console.log("User with the entered email already exists");
      return resp.status(400).json({
        error: "User with the entered email already exists"
      });
    }

     // encrypt the password
    const hashedPassword = await bcrypt.hash(req.body.password, 12);    
    // create new user
    const newUser = new User({    
      email: req.body.email,
      password: hashedPassword,
      validated: false,
      jwtToken: "NULL"
    });   

    // save user to db and create ver link
    const savedUser = await newUser.save();
    const newUserId = savedUser._id;

    // try to send email, return error if unsuccessful
    const verLink = FRONTEND_HEADER + "/validate/" + newUserId;
    const html = `
      <div>
        <h1>REGISTRATION VERIFICATION</h1>
        <p>Please use the following link to verify your account, then you may login:</p>
        <div>
          <p>${verLink}</p>         
        </div>
      </div>
    `;
    const mailOptions = {
      from: "corngrub42069@gmail.com",
      to: req.body.email,
      subject: "Validate Your Registration",
      html: html
    };
    const [isErr, message] = sendMail(mailOptions)
    if (isErr) {
      User.findByIdAndDelete(newUserId);
      return resp.json(400).json({
        error: message
      });      
    }
    console.log(message);   

    // return user obj
    const userToReturn ={ ...savedUser._doc };
    delete userToReturn.password;
    console.log(userToReturn);
    return resp.json(userToReturn);
  } catch (err) {
    console.log(err);
    return resp.status(500).send(err.message);
  }
});

// @route     GET /api/auth/validate
// @desc      Validate newly registered user
// @access    Public
router.put("/validate", async (req, resp) => {
  try {  
    console.log("Put validate");
    if (!req.body.userId) {
      console.log("No id provided");
      return resp.status(400).json({
        error: "No id provided"
      });
    }  

    // check if user exists
    console.log("Check if user exists");    
    const user = await User.findById(req.body.userId);
    if (!user) {
      console.log("No user found with the specified id");
      return resp.status(400).json({
        error: "No user found with the specified id"
      });
    }    

    // update user validated field
    console.log("Update user validated field");    
    const updatedUser = await User.findByIdAndUpdate(req.body.userId, {
      validated: true
    }, {
      new: true
    });

    // send email confirming validation
    const html = `
      <div>
        <h1>YOU'RE NOW REGISTERED!</h1>
        <p>You're now set to start enjoying some Corn Grub! ;)</p>
      </div>
    `;
    const mailOptions = {
      from: "corngrub42069@gmail.com",
      to: user.email,
      subject: "You're Now Registered!",
      html: html
    };
    const [isErr, message] = sendMail(mailOptions)
    if (isErr) {
      return resp.json(400).json({
        error: message
      });      
    }
    console.log(message);   

    // return user json obj without password
    console.log("Return user json obj without password");
    const userToReturn = { ...updatedUser._doc };
    delete userToReturn.password;
    console.log(userToReturn);
    return resp.json(userToReturn);
  } catch (err) {
    return resp.status(500).send(err.message);
  }
});

// @route     POST /api/auth/login
// @desc      Login user and return access token
// @access    Public
router.post("/login", async (req, resp) => {
  try {
    console.log("Posting login");
    
    // check if user exists and is validated
    const user = await User.findOne({
      email: new RegExp("^" + req.body.email + "$", "i")
    });
    if (!user) {
      console.log("User not found");
      return resp.status(400).json({ 
        error: "Unable to login. Invalid username or password." 
      });
    }
    if (!user.validated) {
      console.log("User not validated");
      return resp.status(400).json({
        error: "Unable to login. Please validate your account before attempting to login."
      });
    }

    // check passwords match
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) {
      console.log("Passwords don't match");
      return resp.status(400).json({
        error: "Unable to login. Invalid username or password." 
      });
    }

    // create jwt token
    const jwtToken = jwt.sign({
      userId: user._id
    }, process.env.JWT_SECRET, {
      expiresIn: "2h"
    });

    // create expiration date
    const jwtExpire = addHoursToDate(new Date(), 2);

    // update fields in user
    const updatedUser = await User.findByIdAndUpdate(user._id, {
      jwtToken: jwtToken,
      jwtExpire: jwtExpire
    }, {
      new: true
    });    

    // save token as cookie
    resp.cookie("access-token", jwtToken, {    
      expires: jwtExpire,
      httpOnly: true,
      secure: process.env.NODE_ENV === "prod"
    });

    console.log(typeof jwtToken);
    let decoded = jwt_decode(jwtToken);
    console.log(decoded);

    // remove password from user doc and return user json
    console.log("Return user json obj without password");
    const userToReturn = { ...updatedUser._doc };
    delete userToReturn.password;    
    console.log(userToReturn);
    return resp.json({
      jwtToken: jwtToken,
      user: userToReturn
    });
  } catch (err) {
    console.log(err);
    return resp.status(500).send(err.message);
  }
});

// @route     GET /api/auth/current
// @desc      Return the currently authorized user
// @access    Private
router.get("/current", requiresAuth, (req, resp) => {
  return resp.json(req.user);
});

// @route   PUT /api/auth/logout
// @desc    Logout user and clear cookies
// @access  Private
router.put("/logout", requiresAuth, async (req, resp) => {
  try {
    console.log("Logout route");
    
    // remove token from user in db
    const updatedUser = await User.findByIdAndUpdate(req.user._id, {
      jwtToken: "NULL",
      jwtExpire: undefined
    }, {
      new: true
    });

    // get user json obj to return
    console.log("Return user json obj without password");
    const userToReturn = { ...updatedUser._doc };
    delete userToReturn.password;    
    console.log(userToReturn);    

    // clear cookie in browser
    resp.clearCookie("access-token");
    console.log("User now logged out");
    return resp.json(userToReturn); 
  } catch (err) {
    console.log(err);
    return resp.status(500).send(err.message);
  }
});

module.exports = router;