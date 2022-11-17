const { Schema, model } = require("mongoose");

const ItemSchema = new Schema({     
  itemName: {  
    type: String,
    required: true
  },
  itemType: {
    type: String,
    required: true
  },
  itemPrice: {  
    type: Number,
    required: true
  },
  imgSrc: {
    type: String,
    required: true
  }
});

const Item = model("Item", ItemSchema);
module.exports = { Item };