const { Schema, model } = require("mongoose");

const CartItemSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }, 
  item: {
    type: Schema.Types.ObjectId,
    ref: "Item"
  },
  count: {
    type: Number,
    required: true
  }
});

const CartItem = model("CartItem", CartItemSchema);
module.exports = { CartItem };