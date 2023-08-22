const express = require("express");
const router = express.Router();
const feedsC = require("../controllers/feedsC");

// @desc Create a new feed post
// @route POST /api/user/feed/postFeed
// @access Private
router.post("/postFeed", feedsC.postFeed);

// @desc Get all feed posts
// @route GET /api/user/feed/getFeeds
// @access Public
router.get("/getFeeds", feedsC.getAllPosts);

// @desc Add a like to a feed post
// @route POST /api/user/feed/addLike
// @access Private
router.post("/addLike", feedsC.addLike);

// @desc Add a comment to a feed post
// @route POST /api/user/feed/addComment
// @access Private
router.post("/addComment", feedsC.addComment);

// @desc Update a feed post
// @route POST /api/user/feed/updatePost
// @access Private
router.post("/updatePost", feedsC.updateFeed);

// @desc Delete a feed post
// @route DELETE /api/user/feed/deletePost
// @access Private
router.delete("/deletePost", feedsC.deleteFeed);

// @desc Get a feed post by ID
// @route GET /api/user/feed/getFeedById
// @access Public
router.get("/getFeedById", feedsC.getFeedById);

// @desc Get personal feed for a user
// @route GET /api/user/feed/getPersonalFeed
// @access Private
router.get("/getPersonalFeed", feedsC.getPersonalFeed);

module.exports = router;
