require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADDR,
    pass: process.env.EMAIL_PASS, 
  }
});

transporter.verify((err, success) => {
  err ? console.log(err) : console.log(`=== Server is ready to take messages: ${success} ===`);
});

const sendMail = (mailOptions) => {  
  let isErr = false;
  let message = "";
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      isErr = true;
      message = err;
    } else {
      console.log("Email sent: " + info.response);
      isErr = true;
      message = "Email sent";
    }
  });
  return [isErr, message];
};

module.exports = { sendMail }