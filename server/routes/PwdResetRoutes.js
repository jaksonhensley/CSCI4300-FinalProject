const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const { User } = require("../models/User");
const { PwdResetToken } = require("../models/PwdResetToken");

const { sendMail } = require("../mailer/Mailer");
const { getRandomStr } = require("../const/Funcs");
const { validatePasswordInput } = require("../validation/PasswordValidation");
const { isEmpty } = require("../validation/isEmpty");

// @route     POST /api/pwd/request-reset-password
// @desc      User submits request to reset password
// @access    Public
router.post("/request-reset-pwd", async (req, resp) => {
  try {
    // check if user exists
    const user = await User.findOne({
      email: req.body.email
    });
    if (!user) {
      return resp.status(400).json({
        error: "No user found with the specified email"
      });
    }        

    // generate random token string
    const randomStr = getRandomStr(30);

    // create token entity and save
    const pwdResetToken = new PwdResetToken({
      token: randomStr,
      userId: user._id
    });
    const savedPwdResetToken = await pwdResetToken.save();

    // create link and mail it
    const changePassLink = "localhost:3006/reset-pwd/"+ user._id + "/" + randomStr;
    const html = `
      <div>
        <h1>CHANGE YOUR PASSWORD</h1>
        <p>Please use the link below to change your password.</p>
        <div>
          <p>${changePassLink}</p>         
        </div>
      </div>
    `;
    const mailOptions = {
      from: "corngrub42069@gmail.com",
      to: req.body.email,
      subject: "Change Your Password",
      html: html
    };
    const [isErr, message] = sendMail(mailOptions)
    console.log(message);  
    if (isErr) {
      PwdResetToken.findByIdAndDelete(savedPwdResetToken._id);
      return resp.json(400).json({
        error: message
      });      
    }

    return resp.json(savedPwdResetToken);
  } catch (err) {
    console.log(err);
    return resp.status(500).send(err.message);
  }
});

// @route     GET /api/pwd/reset-pwd-token-exists
// @desc      Called when page for resetting password is loaded
// @access    Public
router.get("/reset-pwd-token-exists", async (req, resp) => {
  try {
    console.log("Check if pwd token exists");

    // get pwd reset token
    const pwdResetToken = await PwdResetToken.findOne({
      token: req.body.token,
      userId: req.body.userId
    });
    // if no pwd reset token found then return with error
    if (!pwdResetToken) {
      return resp.json({
        error: "No pwd reset token found"
      });
    }

    return resp.json(pwdResetToken);
  } catch (err) {
    console.log(err);
    return resp.status(500).send(err.message);
  }
});

// @route     POST /api/pwd/do-reset-password
// @desc      Submit password reset form
// @access    Public
router.post("/reset-pwd", async (req, resp) => {
  try {
    console.log("Resetting password");

    // get pwd reset token
    const pwdResetTokenExists = await PwdResetToken.exists({
      token: req.body.token,
      userId: req.body.userId
    });
    // if no pwd reset token found then return with error
    if (!pwdResetTokenExists) {
      return resp.json({
        error: "No password reset token found"
      });
    }

    // validate password input
    let errs = {};
    validatePasswordInput(req.body, errs);
    if (!isEmpty(errs)) {
      console.log(errs);
      return resp.status(400).json(errs);
    }

    // hash the new password
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    // fetch user by id and update password
    const updatedUser = await User.findByIdAndUpdate(req.body.userId, {
      password: hashedPassword
    }, {
      new: true
    });
    // if no updated user, then fail with error
    if (!updatedUser) {
      console.log("No user found with id " + req.body.userId);
      return resp.status(400).json({
        error: "No user found with id " + req.body.userId
      });
    }

    // delete all pwd reset tokens associated with user
    console.log("Deleting all pwd reset tokens with userId " + req.body.userId);
    await PwdResetToken.deleteMany({
      userId: req.body.userId
    });

    // Email user confirming successful password reset
    const html = `
      <div>
        <h1>YOUR PASSWORD WAS SUCCESSFULLY CHANGED!</h1>
        <p>Your password has been changed successfully!</p>
        <p>All previous password reset links are now invalidated.</p>
        <p>If you wish to reset your password again, you will need to make a new request and receive a new link.</p>
      </div>
    `;
    const mailOptions = {
      from: "corngrub42069@gmail.com",
      to: updatedUser.email,
      subject: "Password Successfully Changed",
      html: html
    };
    const [isErr, message] = sendMail(mailOptions)
    console.log(message);  
    if (isErr) {      
      return resp.json(400).json({
        error: message
      });      
    }

    // return user json obj without password
    console.log("Return user json obj without password");   
    const userToReturn = { ...updatedUser._doc };
    delete userToReturn.password;
    return resp.json(userToReturn);
  } catch (err) {
    console.log(err);
    return resp.status(500).send(err.message);
  }
});

module.exports = router;