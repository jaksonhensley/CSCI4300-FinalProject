const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validateRegisterInput = (data) => {
  let errs = {};

  // check the email field
  if (isEmpty(data.email)) {
    errs.email = "Email field can not be empty";
  } else if (!Validator.isEmail(data.email)) {
    errs.email = "Email is invalid, please provide a valid email";
  }

  // check password field
  if (isEmpty(data.password)) {
    errs.password = "Password field can not be empty";
  } else if (!Validator.isLength(data.password, { min: 10, max: 32 })) {
    errs.password = "Password must be between 10 and 32 characters long";
  }

  // check confirm password field
  if (isEmpty(data.confirmPassword)) {
    errs.confirmPassword = "Confirm Password field can not be empty";
  } else if (!Validator.equals(data.password, data.confirmPassword)) {
    errs.confirmPassword = "Password and confirm password fields must match";
  }

  return {
    errs: errs,
    isValid: isEmpty(errs),
  };
};

module.exports = validateRegisterInput;