const { Schema, model } = require("mongoose");

const CartItemSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }, 
  itemId: {
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