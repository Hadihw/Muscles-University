const { usersCollection } = require('../config/firebase');

// Middleware to check user's membership and grant/deny access
async function checkMembershipAccess(req, res, next) {
	try {
		const userId = req.userId;  // Assuming you store userId in the request after authentication
		const userDoc = await usersCollection.doc(userId).get();
		const user = userDoc.data();
		const membership = user.subscription.type;

		// Check if the user has the required membership or higher
		const allowedMemberships = ['Platinum', 'Gold', 'Silver', 'Free'];
		if (allowedMemberships.indexOf(membership) <= allowedMemberships.indexOf(req.requiredMembership)) {
			next();  // User has required access
		} else {
			res.status(403).json({ message: 'Access denied. Insufficient membership level.' });
		}
	} catch (error) {
		console.error("Error checking membership:", error);
		res.status(500).send("Error checking membership");
	}
}

module.exports = {
	checkMembershipAccess
};
