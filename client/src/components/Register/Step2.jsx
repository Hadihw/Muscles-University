import {CSSTransition, TransitionGroup} from "react-transition-group";
import React from 'react';
const Step2 = ({ subscriptionPlan, setSubscriptionPlan }) => {
	return (
		<TransitionGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-1/2 w-full">
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
						className={`bg-light flex flex-col items-center justify-between h-[500px] p-6 border ${
							subscriptionPlan === plan.id
								? "border-dark"
								: "border-gray-300"
						} h-full w-full`}
						onClick={() => setSubscriptionPlan(plan.id)}
					><div className="w-full">
						<h3 className="text-xl font-bold">{plan.title}</h3>
						<p className="text-2xl font-bold mt-3">
							${plan.price} <span className="text-gray-500">/ month</span>
						</p>
					</div>
						<div className="w-full">
							<p className="text-gray-500">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							</p>
						</div>
						<div className="w-full">
							<button
								type="button"
								className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ${
									subscriptionPlan === plan.id
										? "text-white bg-dark"
										: "text-dark bg-light"
								} hover:text-white hover:bg-dark focus:outline-none`}
							>
								{subscriptionPlan === plan.id ? "Selected" : "Select"}
							</button>
						</div>
					</div>
				</CSSTransition>
			))}
		</TransitionGroup>
	);
};

export default Step2;