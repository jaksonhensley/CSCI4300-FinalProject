const Validator = require("validator");
const { isEmpty } = require("./isEmpty");
const { validatePasswordInput } = require("./PasswordValidation");

const validateRegisterInput = (data, errs) => {
  // check the email field
  if (isEmpty(data.email)) {
    errs.email = "Email field can not be empty";
  } else if (!Validator.isEmail(data.email)) {
    errs.email = "Email is invalid, please provide a valid email";
  }
  // validate password input
  validatePasswordInput(data, errs);
};

module.exports = { validateRegisterInput };