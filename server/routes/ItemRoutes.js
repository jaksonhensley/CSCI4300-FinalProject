const express = require("express");
const router = express.Router();
const { Item } = require("../models/Item");

// @route    GET /items/:itemType? (optional itemType param)
// @desc     Get all items matching the type
// @access   Public
router.get("/:itemType?", async (req, resp) => {
  // get requests do not contain body, so item type must be param
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

module.exports = router;