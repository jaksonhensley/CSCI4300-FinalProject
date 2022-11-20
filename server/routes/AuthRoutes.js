const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const bcrypt = require("bcryptjs");
const validateRegisterInput = require("../validation/RegisterValidation");
const jwt = require("jsonwebtoken");
const requiresAuth = require("../middleware/Permissions");
const { sendMail } = require("../mailer/Mailer");

// @route     POST /api/auth/register
// @desc      Register new user account
// @access    Public
router.post("/register", async (req, resp) => {
  try {    
    // validate registration input
    const { 
      errs, 
      isValid 
    } = validateRegisterInput(req.body);
    console.log("Is valid: " + isValid);
    if (!isValid) {
      console.log(errs);
      return resp.status(400).json(errs);
    }

    // check that user with same email does not already exist
    const existsByEmail = await User.findOne({
      email: new RegExp("^" + req.body.email + "$", "i")
    });
    console.log("Exists already by email: " + existsByEmail);
    if (existsByEmail) {
      console.log("Already a user with email");
      return resp.status(400).json({
        error: "There is already a user with this email"
      });
    }

     // encrypt the password
    const hashPassword = await bcrypt.hash(req.body.password, 12);    
    // create new user
    const newUser = new User({    
      email: req.body.email,
      password: hashPassword,
      validated: false
    });   

    // save user to db and create ver link
    const savedUser = await newUser.save();
    const newUserId = savedUser._id;

    // try to send email, return error if unsuccessful
    const verLink = "localhost:3006/validate/" + newUserId;
    const html = `
      <div>
        <h1>REGISTRATION VERIFICATION</h1>
        <p>Please click the following link to verify your account, then you may login:</p>
        <div>
          <p>${verLink}</p>         
        </div>
      </div>
    `;
    const mailOptions = {
      from: "corngrub42069@gmail.com",
      to: req.body.email,
      subject: "Test",
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

    console.log("Check if user exists");
    // check if user exists
    const user = await User.findById(req.body.userId);
    if (!user) {
      console.log("No user found with the specified id");
      return resp.status(400).json({
        error: "No user found with the specified id"
      });
    }    

    console.log("Update user validated field");
    // update user validated field
    const updatedUser = await User.findByIdAndUpdate(req.body.userId, {
      validated: true
    }, {
      new: true
    });

    console.log("Return user json obg");
    // return user json obj without password
    const userToReturn = { ...updatedUser._doc }
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

    // create session cookie
    const payload = {
      userId: user._id
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });
    resp.cookie("access-token", token, {    
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "prod"
    });

    // remove password from json user info
    const userToReturn = {...user._doc };
    delete userToReturn.password;
    return resp.json({
      token: token,
      user: userToReturn
    });
  } catch (err) {
    console.log(err);
    return resp.status(500).send(err.message);
  }
});

// @route     POST /api/auth/request-reset-pass
// @desc      User submits request to reset password
// @access    Public
router.post("/request-reset-password", async (req, resp) => {
  try {
      // check if user exists
    const userExists = await User.exists({
      email: req.body.email
    });
    if (!userExists) {
      return resp.status(400).json({
        error: "No user found with the specified email"
      });
    }        

    // TODO: Send email to user here

    return resp.message("Sent reset link to email");
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
    resp.clearCookie("access-token");
    return resp.json({ 
      success: true 
    });
  } catch (err) {
    console.log(err);
    return resp.status(500).send(err.message);
  }
});

module.exports = router;