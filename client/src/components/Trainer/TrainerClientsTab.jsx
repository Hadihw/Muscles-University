import React, { useState, useEffect } from 'react';
import axios from "axios";

const TrainerClientsTab = () => {
	const [clients, setClients] = useState([]);

	useEffect(() => {
		// Fetch the list of all users for the trainer to filter
		const fetchUsers = async () => {
			try {
				const response = await axios.get('/api/user/getAllUsers'); // Assuming this is the endpoint to get all users
				const clientList = response.data.filter(user => user.userRole === 'client');
				setClients(clientList);
			} catch (error) {
				console.error("Error fetching users:", error);
			}
		};

		fetchUsers();
	}, []);

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">My Clients</h1>
			<ul>
				{clients.map(client => (
					<li key={client.id} className="mb-2">
						<a href={`/TrainerDashboard/ClientDetails/${client.id}`} className="text-blue-500 hover:underline">
							{client.name}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TrainerClientsTab;