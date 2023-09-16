import React from 'react';
import { useNavigate } from 'react-router-dom';

function UpgradeSubscriptionPrompt() {
	const navigate = useNavigate()


	return (
		<div className="flex flex-col justify-center items-center h-screen bg-gray-200">
			<img src="../../assets/images/logo(500x500).png" alt="Your Logo" className="mb-4 w-100 h-100"/>
			<button
				onClick={() => navigate('/Dashboard/SubscriptionPlans')}
				className="bg-dark w-[400px] h-12 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
			>
				Upgrade Subscription
			</button>
		</div>
	);
}

function withRole(WrappedComponent, allowedRoles) {
	return (props) => {
		const navigate = useNavigate();
		const userRole = props.userData.subscription.type;

		if (!allowedRoles.includes(userRole)) {
			navigate('/Dashboard/Home');
			return <UpgradeSubscriptionPrompt />;
		}

		return <WrappedComponent {...props} />;
	};
}

export default withRole;