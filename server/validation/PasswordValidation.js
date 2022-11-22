const Validator = require("validator");
const { isEmpty } = require("./isEmpty");

const validatePasswordInput = (data, errs) => {
  // check password field
  if (isEmpty(data.password)) {
    errs.password = "Password field can not be empty";
  } else if (!Validator.isLength(data.password, { min: 10, max: 32 })) {
    errs.password = "Password must be between 10 and 32 characters long";
  }
  // check confirm password field
  if (isEmpty(data.confirmPassword)) {
    errs.confirmPassword = "Confirm password field can not be empty";
  } else if (!Validator.equals(data.password, data.confirmPassword)) {
    errs.confirmPassword = "Password and confirm password fields must match";
  }
};

module.exports = { validatePasswordInput };