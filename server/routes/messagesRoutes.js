const express = require('express');
const messagesController = require("../controllers/messagesController");


const router = express.Router();

router.post('/sendMessage', messagesController.sendMessage);

router.get('/getMessages/:userId', messagesController.getMessages);

router.delete('/deleteMessage/:messageId', messagesController.deleteMessage);

module.exports = router;