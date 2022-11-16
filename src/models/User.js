const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: String,
  password: String,
  cart: [{
    itemId: Schema.Types.ObjectId,
    count: Number
  }]
});

const User = model("User", UserSchema);
module.exports = User;