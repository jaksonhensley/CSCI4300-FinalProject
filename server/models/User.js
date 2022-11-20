const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: {  
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  validated: {
    type: Boolean,
    default: false
  },
  jwtToken: {
    type: String,
    default: "NULL"
  },
  jwtExpire: {
    type: Date
  }
});

const User = model("User", UserSchema);
module.exports = { User };