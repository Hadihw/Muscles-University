const express = require('express');
const {
	getSubscriptions,
	getSubscription,
	createSubscription,
	updateSubscription,
	deleteSubscription,
} = require('../controllers/subscriptionController');

const router = express.Router();

router.route('/')
	.get(getSubscriptions)
	.post(createSubscription);

router.route('/:id')
	.get(getSubscription)
	.put(updateSubscription)
	.delete(deleteSubscription);

module.exports = router;