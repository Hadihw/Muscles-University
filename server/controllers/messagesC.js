// messages controller
// Author: Jonathan Haddad
// Date created: Mar 5, 2023
// Description: This file contains the methods for handling the various message related HTTP requests. These include creating a new message, getting all messages between two users, deleting all messages between two users, deleting a single message by ID, getting all users who have a conversation with each other, and getting all messages sent to a specific receiver.




const Account = require("../models/accountM");
const Message = require('../models/messagesM');
const asyncHandler = require("express-async-handler");

// Create a new message
const createMessage = async (req, res) => {
  try {
    const { sender, receiver, message, time, attachments } = req.body;
    const newMessage = new Message({ sender, receiver, message, time });
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all messages between two users
const getMessages = async (req, res) => {
  try {
    const { sender, receiver } = req.query;
    const messages = await Message.find({
      $or: [
        { sender: sender, receiver: receiver },
        { sender: receiver, receiver: sender },
      ],
    }).sort({ time: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete all messages between two users
const deleteMessages = async (req, res) => {
  try {
    const { sender, receiver } = req.query;
    await Message.deleteMany({
      $or: [
        { sender: sender, receiver: receiver },
        { sender: receiver, receiver: sender },
      ],   
     });
    res.status(200).json({ message: 'All messages deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete a single message by ID
const deleteMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    await message.delete();
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users who have a conversation with each other
const getUsersWithConversation = async (req, res) => {
  try {
    const conversations = await Message.distinct("sender", { receiver: { $ne: null } });
    let users = [];
    conversations.forEach((conversation) => {
      const [user1, user2] = conversation.split(",");
      if (!users.includes(user1)) {
        users.push(user1);
      }
      if (!users.includes(user2)) {
        users.push(user2);
      }
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all messages sent to a specific receiver
const getMessagesForReceiver = async (req, res) => {
  try {
    const { receiver } = req.query;
    const messages = await Message.find({ receiver }).sort({ time: 1 });
    const senders = {};
    const senderIds = messages.map((message) => message.sender);
    const sendersList = await Account.find({ _id: { $in: senderIds } }, { name: 1 });
    sendersList.forEach((sender) => (senders[sender._id] = { name: sender.name }));
    messages.forEach((message) => {
      const { sender, message: messageContent } = message;
      if (senders[sender].messages) {
        senders[sender].messages.push(messageContent);
      } else {
        senders[sender].messages = [messageContent];
      }
    });
    res.status(200).json(senders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createMessage,
  getMessages,
  deleteMessages,
  deleteMessageById,
  getUsersWithConversation,
  getMessagesForReceiver,
};
