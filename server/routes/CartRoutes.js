const express = require("express");
const router = express.Router();
const { requiresAuth } = require("../middleware/Permissions");
const { CartItem } = require("../models/CartItem");

// @route    GET /api/cart/current
// @desc     Get all items in the logged-in user's cart
// @access   Private
router.get("/current", requiresAuth, async (req, resp) => {
  try {
    console.log("Get current cart items");
    await CartItem.deleteMany({
      count: { $lt: 1 }
    });
    const cartItems = await CartItem.find({
      userId: req.user._id
    });
    console.log(typeof cartItems);
    console.log(cartItems);
    return resp.json(cartItems);
  } catch (err) {
    console.log(err);
    return resp.status(500).send(err.message);
  }
});

// @route    POST /api/cart/new
// @desc     Post cart item to logged-in user's cart if not already present
// @access   Private
router.post("/new", requiresAuth, async (req, resp) => {
  try {    
    console.log("Add new item to cart");
    const alreadyInCart = await CartItem.exists({
      userId: req.user._id,
      itemId: req.body.itemId
    });
    if (alreadyInCart) {
      console.log("Item already in cart");
      return resp.status(400).json({
        error: "Item already in cart"
      });
    }
    let count = req.body.count;
    if (!count) {
      count = 1;
    }
    console.log("Count: " + count);
    const newCartItem = new CartItem({
      userId: req.user._id,
      itemId: req.body.itemId,
      count: count
    });
    await newCartItem.save();
    return resp.json(newCartItem);
  } catch (err) {
    console.log(err);
    return resp.status(500).send(err.message);
  }
});

// @route    PUT /api/cart/:id
// @desc     Change cart item counter
// @access   Private
router.put("/:id", requiresAuth, async (req, resp) => {
  try {
    // delta val is required
    if (!req.body.delta) {
      return resp.status(404).json({
        error: "No delta specified in request body"
      });
    }    

    // find cart item
    const cartItem = await CartItem.findOne({
      userId: req.user._id,
      _id: req.body.id
    });    
    if (!cartItem) {
      return resp.status(404).json({
        error: "Could not find cart item"
      });
    }

    // make sure to convert delta to int! (put + sign at head of var)
    const newCount = cartItem.count + +req.body.delta;

    // update cart item with new count val
    const updatedCartItem = await CartItem.findOneAndUpdate({
      userId: req.user._id,
      _id: req.body.id
    }, {
      count: newCount
    }, {
      new: true
    });
    return resp.json(updatedCartItem);
  } catch (err) {
    console.log(err);
    return resp.status(500).send(err.message);
  }  
});

// @route    DELETE /api/cart/:id
// @desc     Delete a cart item, or all cart items if no id is given
// @access   Private
router.delete("/:id", requiresAuth, async (req, resp) => {
  try {
    const cartItemExists = CartItem.exists({
      userId: req.user._id,
      _id: req.body.id      
    });
    if (!cartItemExists) {
      return resp.status(404).json({
        error: "Could not find cart item"
      });
    }
    await CartItem.findOneAndDelete({
      user: req.user._id,
      _id: req.body.id
    });
    return resp.json({
      success: true
    });
  } catch (err) {
    console.log(err);
    return resp.status(500).send(err.message);
  }
});

module.exports = router;