const express = require("express");
const connectionC = require("../controllers/connectionC.js");

const router = express.Router();

/**
 * @desc Send a connection request to another user
 * @route POST /user/connection/sendConnectionRequest
 * @access Private
 */
router.post("/sendConnectionRequest", connectionC.sendConnectionRequest);

/**
 * @desc Accept a connection request from another user
 * @route POST /user/connection/acceptConnectionRequest
 * @access Private
 */
router.post("/acceptConnectionRequest", connectionC.acceptConnectionRequest);

/**
 * @desc Reject a connection request from another user
 * @route POST /user/connection/rejectConnectionRequest
 * @access Private
 */
router.post("/rejectConnectionRequest", connectionC.rejectConnectionRequest);

/**
 * @desc Remove a connection to another user
 * @route POST /user/connection/removeConnection
 * @access Private
 */
router.post("/removeConnection", connectionC.removeConnection);

module.exports = router;
