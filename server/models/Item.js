const { Schema, model } = require("mongoose");

const ItemSchema = new Schema({    
  itemPrice: {  
    type: Number,
    required: true
  },
  itemName: {  
    type: String,
    required: true
  },
  imgSrc: {
    type: String,
    required: true
  }
});

const User = model("Item", ItemSchema);
module.exports = { User };