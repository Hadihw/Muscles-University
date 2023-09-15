const { messagesCollection } = require('../config/firebase');
const admin = require('firebase-admin');
const socket = require('../config/socket');
const users = require("./userController");
const {fetchUserById} = require("./userController");

const sendMessage = async (req, res) => {
	const { senderId, recipientId, content } = req.body;

	try {
		const newMessage = {
			senderId,
			recipientId,
			content,
			timestamp: admin.firestore.FieldValue.serverTimestamp()
		};

		await messagesCollection.add(newMessage);

		const senderInfo = await fetchUserById(senderId);
		const senderName = `${senderInfo.firstName} ${senderInfo.lastName}`;
		const senderProfilePic = senderInfo.profilePic;

		// Emit a real-time event after saving the message
		const io = socket.getIo();
		io.to(recipientId).emit('newMessage', {
			...newMessage,
			senderName,
			senderProfilePic
		});

		res.status(201).json({ message: 'Message sent successfully' });
	} catch (error) {
		console.error("Error sending message:", error);
		res.status(500).json({ message: 'There was an issue sending the message. Please try again later.' });
	}
};

const getMessages = async (req, res) => {
	const { userId } = req.params;
	const trainerId = req.query.trainerId;

	let messages = [];

	try {
		if (trainerId) {
			const messagesFromTrainer = await messagesCollection.where('senderId', '==', trainerId).where('recipientId', '==', userId).get();
			const messagesToTrainer = await messagesCollection.where('recipientId', '==', trainerId).where('senderId', '==', userId).get();

			messagesFromTrainer.forEach(doc => messages.push({ id: doc.id, ...doc.data() }));
			messagesToTrainer.forEach(doc => messages.push({ id: doc.id, ...doc.data() }));

			// Sort combined messages based on timestamp
			messages.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
		} else {
			const messagesSnapshot = await messagesCollection.where('recipientId', '==', userId).get();
			messagesSnapshot.forEach(doc => messages.push({ id: doc.id, ...doc.data() }));
		}

		if (messages.length) {
			res.status(200).json(messages);
		} else {
			res.status(200).json([]);
		}
	} catch (error) {
		console.error("Error fetching messages:", error);
		res.status(500).json({ message: 'There was an issue fetching messages. Please try again later.' });
	}
};


const deleteMessage = async (req, res) => {
	const { messageId } = req.params;

	try {
		await messagesCollection.doc(messageId).delete();
		res.status(200).json({ message: 'Message deleted successfully' });
	} catch (error) {
		console.error("Error deleting message:", error);
		res.status(500).json({ message: 'There was an issue deleting the message. Please try again later.' });
	}
};

module.exports = {
	sendMessage,
	getMessages,
	deleteMessage
};