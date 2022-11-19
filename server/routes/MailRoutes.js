const express = require("express");
const router = express.Router();
const { sendMail } = require("../mailer/Mailer");

router.post("/test", async (req, resp) => {
  const html = `  
    <div>
      <h1>REGISTRATION VERIFICATION</h1>
      <br/>
      <p>Please click the following link to verify your account, then you may login:</p>
      <br/>
      <a href="http://localhost:3006/">Verify</a>
    </div>
  `;
  let mailOptions = {
    from: "corngrub42069@gmail.com",
    to: "johnmichaellavender123@gmail.com",
    subject: "Test",
    html: html
  };
  const [isErr, message] = sendMail(mailOptions);
  if (isErr) {
    return resp.status(400).send(message);
  } else {
    return resp.status(200).send(message);
  }
});

module.exports = router;