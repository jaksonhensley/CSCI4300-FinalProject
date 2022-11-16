const { Schema, model } = require("mongoose");
const { ObjectId } = mongoose.Schema;

const PurchasedItemSchema = new Schema(
  {
    item: {
      type: ObjectId,
      ref: "Item"      
    },
    user: {
      type: ObjectId,
      ref: "User"
    }
  }
);

const PurchasedItem = model("PurchasedItem", PurchasedItemSchema);
module.exports = PurchasedItem;