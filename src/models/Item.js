const { Schema, model } = require("mongoose");

const ItemSchema = new Schema(
  {    
    itemPrice: Number,
    itemName: String,
    imgSrc: String
  }
);

const User = model("Item", ItemSchema);
module.exports = User;