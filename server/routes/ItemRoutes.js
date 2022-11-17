const express = require("express");
const router = express.Router();
const requiresAuth = require("../middleware/Permissions");
const { Item } = require("../models/Item");

router.get("/test", requiresAuth, (req, resp) => {
  console.log(req.user._id);
  resp.send("Item's route working");
});

// @route    GET /items
// @desc     Get all items matching the type
// @access   Public
router.get("/:itemType?", async (req, resp) => {
  try {
    let itemTypeParam = req.params.itemType;
    let items;
    if (!itemTypeParam) {
      items = await Item.find({});
    } else {
      let itemType = itemTypeParam.toUpperCase();
      items = await Item.find({
        itemType: itemType
      });
    }
    return resp.json(items);
  } catch (err) {
    return resp.status(500).send(err.message);
  }
});

module.exports = router;