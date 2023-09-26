import React from 'react';
import { useNavigate } from 'react-router-dom';

function UpgradeSubscriptionPrompt() {
	const navigate = useNavigate()

	return (
		<div className="flex flex-col justify-center items-center h-screen p-4">
			<img
				src="../../assets/images/logo(500x500).png"
				alt="Your Logo"
				className="mb-4 w-96 h-96 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
			/>
			<button
				onClick={() => navigate('/ClientDashboard/SubscriptionPlans')}
				className="bg-dark w-[400px] h-14 mt-4 text-white text-xl font-bold py-2 px-4 rounded shadow-lg transition duration-300"
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
			navigate('/ClientDashboard/Home');
			return <UpgradeSubscriptionPrompt />;
		}

		return <WrappedComponent {...props} />;
	};
}

export default withRole;