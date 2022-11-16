const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const validateRegisterInput = require("../validation/RegisterValidation");
const jwt = require("jsonwebtoken");
const requiresAuth = require("../middleware/Permissions");

// @route     GET / auth/register
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
      password: hashPassword
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

// @route     POST /auth/login
// @desc      Login user and return access token
// @access    Public
router.post("/login", async (req, resp) => {
  try {
    // check if user exists
    const user = await User.findOne({
      email: new RegExp("^" + req.body.email + "$", "i")
    });
    if (!user) {
      return resp.status(400).json({ 
        error: "Unable to login. Invalid username or password." 
      });
    }

    // check passwords match
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) {
      return resp.status(400).json({
        error: "Unable to login. Invalid username or password." 
      });
    }

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

// @route     GET /auth/current
// @desc      Return the currently authorized user
// @access    Private
router.get("/current", requiresAuth, (req, resp) => {
  return resp.json(req.user);
});

module.exports = router;