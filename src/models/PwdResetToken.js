const { Schema, model, default: mongoose } = require("mongoose");
const { ObjectId } = mongoose.Schema;

const PwdResetTokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true
    },   
    user: {
      type: ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

const PwdResetToken = model("PwdResetToken", PwdResetTokenSchema);
module.exports = PwdResetToken;