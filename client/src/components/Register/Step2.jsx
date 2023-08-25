import { CSSTransition, TransitionGroup } from "react-transition-group";
import React, { useState } from 'react';

const Step2 = ({ subscriptionPlan, setSubscriptionPlan }) => {
	const [planDuration, setPlanDuration] = useState('monthly'); // monthly or yearly

	return (
		<div className="w-full h-full flex flex-col items-center bg-gradient-to-br from-light to-lighter p-8">
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
					{ id: "basic", title: "Basic Plan", price: "9.99" },
					{ id: "pro", title: "Pro Plan", price: "19.99" },
					{ id: "enterprise", title: "Enterprise Plan", price: "49.99" },
				].map((plan) => (
					<CSSTransition
						key={plan.id}
						in={true}
						timeout={500}
						classNames="subscription-card"
					>
						<div
							className={`flex flex-col justify-between h-[400px] p-6 border rounded shadow-lg transition-transform transform hover:scale-105 ${
								subscriptionPlan === plan.id
									? "border-dark"
									: "border-gray-300"
							}`}
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
							<button
								type="button"
								className={`w-2/3 mx-auto py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ${
									subscriptionPlan === plan.id
										? "bg-dark text-light"
										: "bg-light text-dark border border-dark"
								} hover:bg-dark hover:text-light`}
							>
								{subscriptionPlan === plan.id ? "Selected" : "Select"}
							</button>
						</div>
					</CSSTransition>
				))}
			</TransitionGroup>
		</div>
	);
};

export default Step2;