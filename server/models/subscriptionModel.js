const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	price: {
		type: Number,
		required: true,
		min: 0,
	},
	duration: {
		type: Number,
		required: true,
		min: 1,
	},
	status: {
		type: String,
		enum: ['active', 'inactive'],
		default: 'inactive',
		required: true,
	},
	startDate: {
		type: Date,
		required: false,
	},
	endDate: {
		type: Date,
		required: false,
	},
});

// Virtual property to check if the subscription is active
subscriptionSchema.virtual('isActive').get(function () {
	const now = new Date();
	return this.status === 'active' && this.startDate <= now && now <= this.endDate;
});

// Include virtual properties in the JSON output
subscriptionSchema.set('toJSON', { virtuals: true });

// Index on the subscription name for faster queries (optional)
subscriptionSchema.index({ name: 1 });

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;