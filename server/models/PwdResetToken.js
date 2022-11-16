const { Schema, model } = require("mongoose");

const PwdResetTokenSchema = new Schema({
  token: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }
});

const PwdResetToken = model("PwdResetToken", PwdResetTokenSchema);
module.exports = PwdResetToken;