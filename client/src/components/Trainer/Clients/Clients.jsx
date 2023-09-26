import React, { useState, useEffect } from 'react';
import axios from "axios";

const Clients = () => {
	const [clients, setClients] = useState([]);
	const trainerId = localStorage.getItem('userID');

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get(`/api/user/listAllClientsForTrainer/${trainerId}`);
				setClients(response.data);
			} catch (error) {
				console.error("Error fetching users:", error);
			}
		};

		fetchUsers();
	}, [trainerId]);

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">My Clients</h1>
			<ul>
				{
					clients.length > 0 ? (
						clients.map(client => (
							<li key={client.uid} className="mb-2">
								<p className="text-black">
									{client.firstName} {client.lastName}
								</p>
							</li>
						))
					) : (
						<p>No clients assigned yet.</p>
					)
				}
			</ul>
		</div>
	);
};

export default Clients;