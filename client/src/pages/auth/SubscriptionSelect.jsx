import React, { useState, useEffect } from 'react';

const SubscriptionSelect = ({ onPlanSelected }) => {
	const [plans, setPlans] = useState([]);

	useEffect(() => {

		fetch('/api/user/subscriptions')
			.then((response) => response.json())
			.then((data) => setPlans(data.data));
	}, []);

	return (
		<div className="subscription-select">
			<h2>Select a subscription plan</h2>
			<ul>
				{plans.map((plan) => (
					<li key={plan._id}>
						<button onClick={() => onPlanSelected(plan._id)}>
							{plan.name} - ${plan.price} / month
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default SubscriptionSelect;