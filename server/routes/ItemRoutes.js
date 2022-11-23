const express = require("express");
const router = express.Router();
const { Item } = require("../models/Item");

// @route    GET /items/:itemType? (optional itemType param)
// @desc     Get all items matching the type
// @access   Public
router.get("/:itemType?", async (req, resp) => {
  try {    
    console.log("Get items route");
    console.log(req.params.itemType);
    let items;
    // if item type is present, then filter by item type, otherwise return all items
    if (req.params.itemType) {
      console.log("Return items of type " + req.params.itemType);
      items = await Item.find({
        itemType: req.params.itemType.toUpperCase()
      });
    } else {
      console.log("Return all items");
      items = await Item.find({});
    }
    return resp.json(items);
  } catch (err) {
    console.log(err);
    return resp.status(500).send(err.message);
  }
});

// @route     GET /items/one/:itemId 
// @desc      Get item corresponding to item id
// @access    Public
router.get("/one/:itemId", async (req, resp) => {
  try {
    console.log("Get one item");
    console.log(req.params.itemId);
    // find item by id
    const item = await Item.findById(req.params.itemId);
    // if no item found, return error
    if (!item) {
      return resp.status(400).json({
        error: "No item found"
      });
    }
    // return item in json
    return resp.json(item);
  } catch (err) {
    console.log(err);
    return resp.status(500).send(err.message);
  }
})

module.exports = router;