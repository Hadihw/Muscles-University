import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const CARD_OPTIONS = {
	iconStyle: 'solid',
	style: {
		base: {
			iconColor: '#a3a3a3',
			color: '#43456b',
			fontWeight: 500,
			fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
			fontSize: '16px',
			fontSmoothing: 'antialiased',
			':-webkit-autofill': { color: '#a3a3a3' },
			'::placeholder': { color: '#a3a3a3' },
		},
		invalid: {
			iconColor: '#ffc7ee',
			color: '#ffc7ee',
		},
	},
};

function Step3({ register }) {
	const stripe = useStripe();
	const elements = useElements();

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!stripe || !elements) {
			console.log("Stripe or Elements is not loaded");
			return;
		}

		const cardElement = elements.getElement(CardElement);
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card: cardElement,
		});

		if (!error) {
			if (paymentMethod) {
				console.log("Payment method:", paymentMethod);
				register(paymentMethod.id);
			} else {
				console.log("Payment method is not available");
			}
		} else {
			console.log("Error:", error.message);
		}
	};

	return (
		<div className="flex flex-col items-center w-screen h-screen">
			<h3 className="text-2xl font-bold text-gray-800 mb-8">Payment Gateway</h3>
			<div className="flex justify-between w-4/5 p-8 bg-white shadow-md rounded">
				<div className="flex flex-col w-1/2">
					<form onSubmit={handleSubmit}>
						<label className="text-lg font-bold text-gray-800 mb-3">np
							Card Details
							<CardElement options={CARD_OPTIONS} className="mt-2" />
						</label>
						<div className="flex items-center my-4">
							<input type="checkbox" id="saveCard" name="saveCard" className="mr-2" />
							<label htmlFor="saveCard">Save Card</label>
						</div>
						<button
							className="bg-gray-800 text-white py-2 px-4 font-bold rounded mr-3 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50"
							type="submit"
							disabled={!stripe}
						>
							Pay Now
						</button>
						<button
							className="bg-gray-400 text-white py-2 px-4 font-bold rounded focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
							type="button"
						>
							Cancel
						</button>
					</form>
				</div>
				<div className="flex flex-col items-center px-8 border-l border-gray-400">
					<img src="https://via.placeholder.com/150" alt="Product" className="w-36 h-36 object-cover rounded mb-4" />
					<h4 className="text-xl font-bold text-gray-800 mb-1">Product Name</h4>
					<p className="text-lg text-gray-800">$99.99</p>
				</div>
			</div>
		</div>
	);
}

export default Step3;