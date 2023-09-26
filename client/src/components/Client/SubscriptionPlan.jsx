import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { CSSTransition, TransitionGroup } from "react-transition-group";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const SubscriptionPlans = () => {
	const [planDuration, setPlanDuration] = useState('monthly');
	const [subscriptionPlan, setSubscriptionPlan] = useState(null);
	const [userData, setUserData] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const userID = localStorage.getItem('userID');

	useEffect(() => {
		setIsLoading(true);
		// Fetch user data
		axios.get(`/api/user/users/${userID}`)
			.then(response => {
				const user = response.data;
				setUserData(user);
				setIsLoading(false);
			})
			.catch(error => {
				console.error("An error occurred while fetching data: ", error);
				setError("There was a problem fetching the user data.");
				setIsLoading(false);
			});
	}, [userID]);

	const handleSubscribeClick = async () => {
		if (!subscriptionPlan) {
			alert('Please select a subscription plan before proceeding.');
			return;
		}

		let priceId;
		switch (subscriptionPlan) {
			case 'gold':
				priceId = "price_1NkvP2FkOBi2l0oyEzRGvkIY";
				break;
			case 'silver':
				priceId = "price_1NkyMfFkOBi2l0oyVmQzorQE";
				break;
			case 'platinum':
				priceId = "price_1NkyNXFkOBi2l0oyKkIl72an";
				break;
			default:
				alert("Invalid subscription tier selected");
				return;
		}

		try {

			const response = await axios.post('/api/stripe/createCheckoutSession', {
				email: userData.email,
				priceId: priceId,
				firstName: userData.firstName,
				lastName: userData.lastName,
				subscriptionTier: subscriptionPlan,
				duration: planDuration
			});

			const stripe = await stripePromise;
			const { sessionId } = response.data;
			const result = await stripe.redirectToCheckout({ sessionId });

			if (result.error) {
				console.error(result.error.message);
			}
		} catch (error) {
			console.error('Error starting subscription:', error);
		}
	};

	return (
		<div className="w-full h-full flex flex-col items-center p-8">
			{/* Toggle for Monthly and Yearly */}
			<div className="w-full flex justify-center space-x-4 mb-6">
				<button
					onClick={() => setPlanDuration('monthly')}
					className={`text-lg px-6 py-2 rounded ${planDuration === 'monthly' ? 'bg-dark text-light' : 'bg-light text-dark border border-dark'}`}
				>
					Monthly
				</button>
				<button
					onClick={() => setPlanDuration('yearly')}
					className={`text-lg px-6 py-2 rounded ${planDuration === 'yearly' ? 'bg-dark text-light' : 'bg-light text-dark border border-dark'}`}
				>
					Yearly
				</button>
			</div>

			<TransitionGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
				{[
					{ id: "silver", title: "Silver Titan", price: "9.99" },
					{ id: "gold", title: "Gold Titan", price: "19.99" },
					{ id: "platinum", title: "Platinum Titan", price: "49.99" },
				].map((plan) => (
					<CSSTransition key={plan.id} in={true} timeout={500} classNames="subscription-card">
						<div
							className={`bg-gradient-to-br from-light to-lighter flex flex-col justify-between h-[400px] p-6 border rounded shadow-lg transition-transform transform hover:scale-105 ${subscriptionPlan === plan.id ? "border-dark" : "border-gray-300"}`}
							onClick={() => setSubscriptionPlan(plan.id)}
						>
							<div className="w-full text-center mb-4">
								<h3 className="text-2xl font-bold text-dark mb-2">{plan.title}</h3>
								<p className="text-3xl font-semibold">
									${planDuration === 'yearly' ? (parseFloat(plan.price) * 12).toFixed(2) : plan.price}
									<span className="text-gray-500">/ {planDuration}</span>
								</p>
							</div>
							<p className="text-gray-500 text-center mb-4">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							</p>
							<button type="button" className={`w-2/3 mx-auto py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ${subscriptionPlan === plan.id ? "bg-dark text-light" : "bg-light text-dark border border-dark"}`}>
								{subscriptionPlan === plan.id ? "Selected" : "Select"}
							</button>
						</div>
					</CSSTransition>
				))}
			</TransitionGroup>

			<button onClick={handleSubscribeClick} className="mt-8 px-6 py-2 bg-dark text-light rounded">
				Proceed to Checkout
			</button>
		</div>
	);
};

export default SubscriptionPlans;