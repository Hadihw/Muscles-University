const { usersCollection } = require('../config/firebase');
const admin = require("firebase-admin");

async function updateSubscription(req, res) {
	const { id } = req.params;
	const {
		subscriptionType,
		billingCycle,
		autoRenewal
	} = req.body;

	if (!subscriptionType || !billingCycle || autoRenewal === undefined) {
		return res.status(400).json({ message: 'Missing subscription details' });
	}

	const startDate = new Date();
	let subscriptionEndDate;

	switch (subscriptionType) {
		case "Free":
			subscriptionEndDate = null; // Infinite end date for Free plan
			break;
		case "Monthly":
			subscriptionEndDate = admin.firestore.Timestamp.fromDate(new Date(startDate.setMonth(startDate.getMonth() + 1)));
			break;
		case "Annually":
			subscriptionEndDate = admin.firestore.Timestamp.fromDate(new Date(startDate.setFullYear(startDate.getFullYear() + 1)));
			break;
		default:
			return res.status(400).json({ message: 'Invalid subscription type' });
	}

	const userRef = usersCollection.doc(id);
	try {
		await userRef.update({
			"subscription.type": subscriptionType,
			"subscription.startDate": admin.firestore.Timestamp.fromDate(startDate),
			"subscription.endDate": subscriptionEndDate,
			"subscription.billingCycle": billingCycle,
			"subscription.autoRenewal": autoRenewal
		});

		res.status(200).json({ message: 'Subscription updated successfully.' });
	} catch (error) {
		console.error("Error updating subscription:", error);
		res.status(500).send("Error updating subscription");
	}
}

function canAccessFeatures(userSubscription) {
	if (userSubscription.type === 'Free') {
		return false; // Only has access to free features
	}

	const currentDate = new Date();
	if (userSubscription.endDate && userSubscription.endDate > currentDate) {
		return true; // Has access to premium features until endDate
	}

	return false; // No longer has access to premium features
}

module.exports = {
	updateSubscription,
	canAccessFeatures
};