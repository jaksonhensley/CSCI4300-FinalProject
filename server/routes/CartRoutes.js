const express = require("express");
const router = express.Router();
const { requiresAuth } = require("../middleware/Permissions");
const { CartItem } = require("../models/CartItem");
const { sendMail } = require("../mailer/Mailer");

// @route    GET /api/cart/current
// @desc     Get all items in the logged-in user's cart
// @access   Private
router.get("/current", requiresAuth, async (req, resp) => {
  try {
    // get current cart items
    console.log("Get current cart items");
    await CartItem.deleteMany({
      count: { $lt: 1 }
    });
    const cartItems = await CartItem.find({
      userId: req.user._id
    });
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
      console.log("No delta specified in request body");
      return resp.status(400).json({
        error: "No delta specified in request body"
      });
    }    

    // find cart item
    const cartItem = await CartItem.findOne({
      userId: req.user._id,
      _id: req.params.id
    });    
    if (!cartItem) {
      console.log("Could not find cart item");
      return resp.status(400).json({
        error: "Could not find cart item"
      });
    }

    // make sure to convert delta to int! (put + sign at head of var)
    const newCount = cartItem.count + +req.body.delta;
    console.log("New count: " + newCount);

    // update cart item with new count val
    const updatedCartItem = await CartItem.findOneAndUpdate({
      userId: req.user._id,
      _id: req.params.id
    }, {
      count: newCount
    }, {
      new: true
    });
    console.log(updatedCartItem);
    return resp.json(updatedCartItem);
  } catch (err) {    
    console.log(err);
    return resp.status(500).send(err.message);
  }  
});

// @route    DELETE /api/cart/delete/:id
// @desc     Delete a cart item, or all cart items if no id is given
// @access   Private
router.delete("/delete/:id", requiresAuth, async (req, resp) => {
  try {
    console.log("Delete cart item with id " + req.params.id);
    const cartItemExists = CartItem.exists({
      userId: req.user._id,
      _id: req.params.id      
    });
    if (!cartItemExists) {
      console.log("Cart item with id " + req.params.id + " doesn't exist");
      return resp.status(404).json({
        error: "Could not find cart item"
      });
    }
    await CartItem.findOneAndDelete({
      userId: req.user._id,
      _id: req.params.id
    });
    console.log("Cart item deleted");
    return resp.json({
      success: true
    });
  } catch (err) {
    console.log(err);
    return resp.status(500).send(err.message);
  }
});

// @route     DELETE /api/cart/deleteAll
// @desc      Deletes all cart items associated with the user
// @access    Private
router.delete("/deleteAll", requiresAuth, async (req, resp) => {
  try {
    console.log("Delete all cart items belonging to user with id " + req.user._id);
    await CartItem.deleteMany({
      userId: req.user._id
    });
    console.log("All cart items belonging to user are deleted");
    return resp.json({
      success: true
    });
  } catch (err) {
    console.log("Error deleting all cart items of user");
    console.log(err);
    return resp.status(500).send(err.message);
  }
});

// @route     POST /api/cart/order
// @desc      Transfers all cart items to delivery
// @access    Private
router.post("/order", requiresAuth, async (req, resp) => {
  try {
    // delete all cart items belonging to user
    console.log("Processing order");
    await CartItem.deleteMany({
      userId: req.user._id
    });

    console.log("Trying to email user about order...");
    // send order confirmation email
    const html = `
      <div>
        <h1>YOUR ORDER'S ON ITS WAY!</h1>
        <p>Thank you for using Corn grub for your corny needs! Your order's on its way and should be arriving soon! ;)</p>
      </div>
    `;
    const mailOptions = {
      from: "corngrub42069@gmail.com",
      to: req.user.email,
      subject: "Your Order's On Its Way!",
      html: html
    };
    const [isErr, message] = await sendMail(mailOptions)
    if (isErr) {
      return resp.json(400).json({
        error: message
      });      
    }
    console.log(message);   

    return resp.json({
      success: true
    });
  } catch (err) {
    console.log("Error in processing order");
    console.log(err);
    return resp.status(500).send(err.message);
  }
});

module.exports = router;