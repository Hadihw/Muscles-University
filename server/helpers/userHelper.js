// helpers/userHelper.js

const { usersCollection } = require('../config/firebase');

// Helper function to get a user by email
async function getUserByEmail(email) {
	const snapshot = await usersCollection.where('email', '==', email).get();

	if (snapshot.empty) return null;

	const doc = snapshot.docs[0];
	return { id: doc.id, ...doc.data() };
}

module.exports = {
	getUserByEmail
};