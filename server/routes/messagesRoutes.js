const express = require('express');
const messagesController = require("../controllers/messagesController");

const router = express.Router();

// Route to send a message
router.post('/sendMessage', messagesController.sendMessage);

// Route to get all messages for a specific user
router.get('/getMessages/:userId', messagesController.getMessages);

// Route to delete a specific message by message ID
router.delete('/deleteMessage/:messageId', messagesController.deleteMessage);

module.exports = router;