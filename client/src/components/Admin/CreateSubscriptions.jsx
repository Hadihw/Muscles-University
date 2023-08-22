import React, { useState } from 'react';
import axios from 'axios';

const CreateSubscription = () => {


	const [subscriptionPlanData, setSubscriptionPlanData] = useState({
		name: '',
		price: '',
		duration: '',
		status: 'inactive',
		startDate: Date.now(),
		endDate: '',

	});

	const handleInputChange = (e, setState) => {
		const { name, value } = e.target;
		setState((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleCreateSubscriptionPlan = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('/api/user/subscriptions', subscriptionPlanData);
			setSubscriptionPlanData({
				name: '',
				price: '',
				duration: '',
				status: 'inactive',
				startDate: Date.now(),
				endDate: '',
			});
			window.location.reload();

			// Show a success message or redirect to another page
		} catch (error) {
			console.error('Error creating subscription:', error);
			// Show an error message
		}
	};

	return (
		<form onSubmit={handleCreateSubscriptionPlan}>
			<label>
				Name:
				<input
					type="text"
					name="name"
					value={subscriptionPlanData.name}
					onChange={(e) => handleInputChange(e, setSubscriptionPlanData)}
					required
				/>
			</label>
			<label>
				Price:
				<input
					type="number"
					name="price"
					min="0"
					step="0.01"
					value={subscriptionPlanData.price}
					onChange={(e) => handleInputChange(e, setSubscriptionPlanData)}
					required
				/>
			</label>
			<label>
				Duration (months):
				<input
					type="number"
					name="duration"
					min="1"
					value={subscriptionPlanData.duration}
					onChange={(e) => handleInputChange(e, setSubscriptionPlanData)}
					required
				/>
			</label>
			<label>
				Status:
				<select name="status" value={subscriptionPlanData.status} onChange={(e) => handleInputChange(e, setSubscriptionPlanData)}>
					<option value="inactive">Inactive</option>
					<option value="active">Active</option>
				</select>
			</label>
			<button className="w-20 text-white rounded-full bg-dark" type="submit">Submit</button>
		</form>
	);
};
export default CreateSubscription;