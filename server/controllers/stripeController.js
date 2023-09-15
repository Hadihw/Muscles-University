const stripe = require('../config/stripe');
const admin = require('firebase-admin');
const { firestore } = require("../config/firebase");

const createCheckoutSession = async (req, res) => {
	const {
		email,
		priceId,
		firstName,
		lastName,
		subscriptionTier,
		duration
	} = req.body;


	try {

		if (!priceId) {
			return res.status(400).send("Invalid subscription tier");
		}

		const session = await stripe.checkout.sessions.create({
			customer_email: email,
			payment_method_types: ["card"],
			line_items: [{
				price: priceId,
				quantity: 1,
			}],
			mode: "subscription",
			success_url: `${process.env.FRONTEND_URL}/register?success`,
			cancel_url: `${process.env.FRONTEND_URL}/register?cancel`,
			metadata: {
				email,
				firstName,
				lastName,
				subscriptionTier,
				duration
			}
		});

		res.json({ sessionId: session.id });
	} catch (error) {
		console.error("Error creating checkout session:", error);
		res.status(500).send("Error creating checkout session");
	}
};

const cancelSubscriptionInStripe = async (req, res) => {
	const userId = req.user.id; // Assuming you have middleware that sets req.user based on the authenticated user

	// Fetch the user from your database
	const userSnapshot = await firestore.collection('users').doc(userId).get();
	const user = userSnapshot.data();

	if (!user || !user.subscription || !user.subscription.id) {
		return res.status(400).send("User does not have an active subscription");
	}

	try {
		// Cancel the subscription using Stripe SDK
		await stripe.subscriptions.del(user.subscription.id);

		// Since the Firestore update is handled by the webhook, you don't need to do anything else here.
		res.status(200).send("Subscription cancellation process started successfully. It will be finalized shortly.");
	} catch (error) {
		console.error("Error triggering subscription cancellation in Stripe:", error);
		res.status(500).send("Error triggering subscription cancellation");
	}
};

const stripeWebhook = async (req, res) => {
	const sig = req.headers['stripe-signature'];
	let event;
	let userSnapshot;
	try {
		event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
	} catch (err) {
		return res.status(400).send(`Webhook Error: ${err.message}`);
	}

	switch (event.type) {
		case 'checkout.session.completed':
			const session = event.data.object;

			const subscriptionId = session.subscription;
			let endDate = new Date();
			if (session.metadata.duration === 'yearly') {
				endDate.setFullYear(endDate.getFullYear() + 1);
			} else if (session.metadata.duration === 'monthly') {
				endDate.setMonth(endDate.getMonth() + 1);
			} else {
				console.error("Unknown subscription duration:", session.metadata.duration);
				return res.status(400).send("Unknown subscription duration");
			}

			userSnapshot = await firestore.collection('users').where('email', '==', session.metadata.email).get();

			if (!userSnapshot.empty) {
				const userRef = userSnapshot.docs[0].ref;

				// Update the user's subscription details
				await userRef.update({
					'subscription.id': subscriptionId,
					'subscription.type': session.metadata.subscriptionTier,
					'subscription.startDate': admin.firestore.Timestamp.fromDate(new Date()),
					'subscription.endDate': admin.firestore.Timestamp.fromDate(endDate)
				});

				// Add the new subscription details to the subscriptionHistory sub-collection within the user
				const subscriptionHistoryRef = userRef.collection('subscriptionHistory').doc();
				await subscriptionHistoryRef.set({
					id: subscriptionId,
					type: session.metadata.subscriptionTier,
					startDate: admin.firestore.Timestamp.fromDate(new Date()),
					endDate: admin.firestore.Timestamp.fromDate(endDate)
				});


			} else {
				console.error(`User with email ${session.metadata.email} not found`);
				return res.status(404).send("User not found");
			}
			break;

		case 'customer.subscription.deleted':
			const subscription = event.data.object;
			userSnapshot = await firestore.collection('users').where('subscription.id', '==', subscription.id).get();

			if (!userSnapshot.empty) {
				const userRef = userSnapshot.docs[0].ref;
				await userRef.update({
					'subscription.type': 'Free',
					'subscription.id': null,
					'subscription.startDate': admin.firestore.Timestamp.fromDate(new Date())
				});
			}
			break;

		default:
			console.log(`Unhandled event type ${event.type}`);
	}

	// Acknowledge the webhook event
	res.status(200).send('Webhook received successfully');
};


const getSubscriptionPlans = async (req, res) => {
	try {
		const productsCollection = firestore.collection('products');
		const querySnapshot = await productsCollection.get();  // Use .get() directly here

		const plans = [];
		querySnapshot.forEach((doc) => {
			plans.push({
				id: doc.id,
				...doc.data()
			});
		});

		res.status(200).json(plans);
	} catch (error) {
		console.error("Error fetching subscription plans:", error);
		res.status(500).send("Error fetching subscription plans");
	}
};

module.exports = {
	createCheckoutSession,
	cancelSubscriptionInStripe,
	stripeWebhook,
	getSubscriptionPlans
};