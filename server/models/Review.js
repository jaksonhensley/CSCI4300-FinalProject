const { Schema, model } = require("mongoose");

const ReviewSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }, 
  itemId: {
    type: Schema.Types.ObjectId,
    ref: "Item"
  },
  text: {
    type: String,
    required: true    
  },
  rating: {
    type: Number,
    required: true    
  }
});

const Review = model("Review", ReviewSchema);
module.exports = { Review };