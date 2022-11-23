const express = require("express");
const router = express.Router();

const { requiresAuth } = require("../middleware/Permissions");
const { isEmpty } = require("../validation/isEmpty");

const { Review } = require("../models/Review");

// @route     GET /api/reviews/:itemId
// @desc      Get all reviews associated with the item
// @access    Public
router.get("/:itemId", async (req, resp) => {
  try {
    // fetch review by item id
    const reviews = await Review.find({
      itemId: req.params.itemId
    });
    return resp.json(reviews);
  } catch (err) {
    console.log(err);
    return resp.status(500).send(err.message);
  }
});

// @route     POST /api/reviews/new
// @desc      Post new review for item
// @access    Private
router.post("/new", requiresAuth, async (req, resp) => {
  try {
    // review cannot already exist
    const alreadyExists = await Review.exists({
      userId: req.user._id,
      itemId: req.body.itemId
    });
    if (alreadyExists) {
      return resp.status(400).json({
        error: "User has already written a review for this item"
      });
    }

    // review text cannot be empty
    if (isEmpty(req.body.text)) {
      return resp.status(400).json({
        error: "Review text cannot be empty"
      });      
    }

    // review rating must be between 0 and 5 (inclusive)
    if (isEmpty(req.body.rating) || req.body.rating < 0 || req.body.rating > 5) {
      return resp.status(400).json({
        error: "Rating is out of range for allowed numeric values"
      });
    }

    // instantiate new review, save, and return
    const review = new Review({
      userId: req.user._id,
      itemId: req.body.itemId,
      text: req.body.text,
      rating: req.body.rating
    });
    await review.save();
    return resp.json(review);
  } catch (err) {
    console.log(err);
    return resp.status(500).send(err.message);
  }
});

// @route     PUT /api/review/:reviewId
// @desc      Edit an existing review
// @access    Private
router.put("/:reviewId", requiresAuth, async (req, resp) => {
  try {
    // review text cannot be empty
    if (isEmpty(req.body.text)) {
      return resp.status(400).json({
        error: "Review text cannot be empty"
      });
    }

    // update the review 
    const updatedReview = await Review.findOneAndUpdate({
      _id: req.params.reviewId,
      userId: req.user._id
    }, {
      text: req.body.text,
      rating: req.body.rating
    }, {
      new: true
    });

    // return 400 stat on failure to update review
    if (!updatedReview) {
      return resp.status(400).json({
        error: "Unable to update review"
      });
    }

    // return updated review doc
    return resp.json(updatedReview);
  } catch (err) {
    console.log(err);
    return resp.status(500).send(err.message);
  }
});

// @route     DELETE /api/review/:reviewId
// @desc      Delete review
// @access    Private
router.delete("/:reviewId", requiresAuth, async (req, resp) => {
  try {
    // find review by id and delete
    const deletedReview = await Review.findOneAndDelete({
      _id: req.params.reviewId,
      userId: req.user._id
    });

    // unable to delete review
    if (!deletedReview) {
      console.log("Unable to delete review");
      return resp.status(400).json({
        error: "Unable to delete review"
      });
    }

    // successfully deleted review
    return resp.json({
      success: true
    });
  } catch (err) {
    console.log(err);
    return resp.status(500).send(err.message);
  }
});

module.exports = router;