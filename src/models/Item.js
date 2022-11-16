const { Schema, model } = require("mongoose");

const ItemSchema = new Schema(
  {
    itemName: {
      type: String,
      required: true
    },
    itemPrice: {
      type: Number,
      required: true
    },
    imgSrc: [{
      type: String,
      required: true
    }]
  },
  {
    timestamps: true
  }
);

const User = model("Item", ItemSchema);
module.exports = User;