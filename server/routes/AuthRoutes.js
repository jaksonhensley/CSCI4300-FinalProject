const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const bcrypt = require("bcryptjs");
const validateRegisterInput = require("../validation/RegisterValidation");
const jwt = require("jsonwebtoken");
const requiresAuth = require("../middleware/Permissions");

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
      return resp.status(400).json(errs);
    }

    // check that user with same email does not already exist
    const existsByEmail = await User.findOne({
      email: new RegExp("^" + req.body.email + "$", "i")
    });
    console.log("Exists already by email: " + existsByEmail);
    if (existsByEmail) {
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

    // save user to db
    const savedUser = await newUser.save();

    // return user obj
    const userToReturn ={ ...savedUser._doc };
    delete userToReturn.password;
    return resp.json(userToReturn);
  } catch (err) {
    console.log(err);
    return resp.status(500).send(err.message);
  }
});

// @route     GET /api/auth/validate/:id
// @desc      Validate newly registered user
// @access    Public
router.put("/validate/:id", async (req, resp) => {
  try {  
    if (!req.params.id) {
      return resp.status(400).json({
        error: "No id provided"
      });
    }  

    // check if user exists
    const user = await User.findById(req.params.id);
    if (!user) {
      return resp.status(400).json({
        error: "No user found with the specified id"
      });
    }    

    // update user validated field
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      validated: true
    }, {
      new: true
    });

    // return user json obj without password
    const userToReturn = { ...updatedUser._doc }
    delete userToReturn.password;
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
    // check if user exists and is validated
    const user = await User.findOne({
      email: new RegExp("^" + req.body.email + "$", "i")
    });
    if (!user) {
      return resp.status(400).json({ 
        error: "Unable to login. Invalid username or password." 
      });
    }
    if (!user.validated) {
      return resp.status(400).json({
        error: "Unable to login. Please validate your account before attempting to login."
      });
    }

    // check passwords match
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) {
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
      secure: process.env.NODE_ENV === "production"
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