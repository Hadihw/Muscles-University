const Subscription = require('../models/subscriptionModel');

// Get all subscriptions
exports.getSubscriptions = async (req, res) => {
	try {
		const subscriptions = await Subscription.find();
		res.status(200).json({ success: true, data: subscriptions });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Get a single subscription by ID
exports.getSubscription = async (req, res) => {
	try {
		const subscription = await Subscription.findById(req.params.id);

		if (!subscription) {
			return res.status(404).json({ success: false, message: 'Subscription not found' });
		}

		res.status(200).json({ success: true, data: subscription });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Create a new subscription
exports.createSubscription = async (req, res) => {
	try {
		const subscription = await Subscription.create(req.body);
		res.status(201).json({ success: true, data: subscription });
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

// Update a subscription
exports.updateSubscription = async (req, res) => {
	try {
		const subscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!subscription) {
			return res.status(404).json({ success: false, message: 'Subscription not found' });
		}

		res.status(200).json({ success: true, data: subscription });
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

// Delete a subscription
exports.deleteSubscription = async (req, res) => {
	try {
		const subscription = await Subscription.findByIdAndDelete(req.params.id);

		if (!subscription) {
			return res.status(404).json({ success: false, message: 'Subscription not found' });
		}

		res.status(200).json({ success: true, message: 'Subscription deleted' });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};