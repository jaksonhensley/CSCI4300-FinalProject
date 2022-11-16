const { Schema, model, default: mongoose } = require("mongoose");
const { ObjectId } = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    purchasedItems: [{
      type: ObjectId,
      ref: "PurchasedItem",
      required: true
    }]
  },
  {
    timestamps: true
  }
);

const User = model("User", UserSchema);
module.exports = User;