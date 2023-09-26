import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required')
});

const UserManagement = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: ''
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [trainers, setTrainers] = useState([]);
    const [selectedTrainerClients, setSelectedTrainerClients] = useState([]);
    const [modalContent, setModalContent] = useState('');
    const [clients, setClients] = useState([]);
    const [selectedTrainer, setSelectedTrainer] = useState("");
    const [selectedClient, setSelectedClient] = useState("");

    const fetchTrainers = async () => {
        try {
            const response = await axios.get('/api/user/getAllTrainers');
            setTrainers(response.data);
        } catch (error) {
            console.error("Error fetching trainers:", error);
        }
    };

    const fetchClients = async () => {
        try {
            const response = await axios.get('/api/user/getAllClients');
            setClients(response.data);
        } catch (error) {
            console.error("Error fetching clients:", error);
        }
    };

    useEffect(() => {

        fetchClients();
        fetchTrainers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const openModal = (content) => {
        setModalContent(content);
        setModalOpen(true);
    };

    const closeModal = () => setModalOpen(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        try {
            await schema.validate(formData, { abortEarly: false });
            const response = await axios.post('/api/admin/registerTrainer', formData);
            setMessage(response.data.message);
            await fetchTrainers();
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                const errorMessages = {};
                error.inner.forEach(err => {
                    errorMessages[err.path] = err.message;
                });
                setErrors(errorMessages);
            } else {
                setMessage('Error registering trainer. Please try again later.');
            }
        } finally {
            setLoading(false);
            closeModal();
        }
    };

    const listClientsForTrainer = async (trainerId) => {
        try {
            const response = await axios.get(`/api/user/listAllClientsForTrainer/${trainerId}`);
            if (response.data.length === 0) {
                setSelectedTrainerClients([]);
            } else {
                setSelectedTrainerClients(response.data);
            }
            openModal('listClients');
        } catch (error) {
            console.error("Error listing clients for trainer:", error);
        }
    };

    const findTrainerName = (trainerId) => {
        const trainer = trainers.find(trainer => trainer.id === trainerId);
        return trainer ? `${trainer.firstName} ${trainer.lastName}` : 'No Trainer';
    };

    const assignClientToTrainer = async (clientId) => {
        try {
            // wait for the request to complete before fetching clients
            await axios.post('/api/admin/assignClientToTrainer', { trainerId: selectedTrainer, clientId });
            await fetchClients(); // Now fetch clients to update the list with assigned trainer
        } catch (error) {
            console.error("Error assigning client:", error);
        }
    };

    const removeClientFromTrainer = async (trainerId, clientId) => {
        try {
            await axios.post('/api/admin/removeClientFromTrainer', { trainerId, clientId });
            await fetchClients(); // Re-fetch clients to update the list with removed trainer
        } catch (error) {
            console.error("Error removing client:", error);
        }
    };



    return (
        <div className="p-4">
            <h2 className="text-2xl mb-4">User Management</h2>
            <button onClick={() => openModal('register')} className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Register Trainer
            </button>
            <div className="mt-8 overflow-x-auto">
                <h3 className="text-xl mb-4">List of Trainers</h3>
                <div className="overflow-x-auto">
                    <table className="table z-0">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                        </thead>
                        <tbody>
                        {trainers.map(trainer => (
                            <tr key={trainer.id}>
                                <td>{trainer.id}</td>
                                <td>{trainer.firstName} {trainer.lastName}</td>
                                <td>{trainer.email}</td>
                                <td>
                                    <button onClick={() => listClientsForTrainer(trainer.id)} className="p-1 bg-green-500 text-white rounded hover:bg-green-600">
                                        List Clients
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-8 overflow-x-auto">
                <h3 className="text-xl mb-4">List of Clients</h3>
                <div className="overflow-x-auto">
                    <table className="table z-0">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Trainer</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {clients.map(client => (
                            <tr key={client.id}>
                                <td>{client.id}</td>
                                <td>{client.firstName} {client.lastName}</td>
                                <td>{client.email}</td>
                                <td>{findTrainerName(client.assignedTrainer) || 'No Trainer'}</td>
                                <td>
                                    {client.assignedTrainer ? (
                                        <button
                                            onClick={() => removeClientFromTrainer(client.assignedTrainer, client.id)}
                                            className="p-2 bg-red-600 text-white rounded hover:bg-red-700">
                                            Remove from Trainer
                                        </button>
                                    ) : (
                                        <div className="flex items-center">
                                            <select
                                                value={selectedTrainer}
                                                onChange={(e) => setSelectedTrainer(e.target.value)}
                                                className="mr-2 p-2 border rounded">
                                                <option value="" disabled>Select Trainer</option>
                                                {trainers.map(trainer => (
                                                    <option key={trainer.id} value={trainer.id}>
                                                        {trainer.firstName}
                                                    </option>
                                                ))}
                                            </select>
                                            <button
                                                onClick={() => assignClientToTrainer(client.id)}
                                                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                                Assign
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                {modalContent === 'register' ? (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label htmlFor="email" className="block mb-2">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full p-2 border rounded"
                                            />
                                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="firstName" className="block mb-2">First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                id="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                className="w-full p-2 border rounded"
                                            />
                                            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="lastName" className="block mb-2">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                id="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                className="w-full p-2 border rounded"
                                            />
                                            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="block mb-2">Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="w-full p-2 border rounded"
                                            />
                                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="confirmPassword" className="block mb-2">Confirm Password</label>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                id="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                className="w-full p-2 border rounded"
                                            />
                                            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                                        </div>
                                        <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600" disabled={loading}>
                                            {loading ? 'Loading...' : 'Register'}
                                        </button>
                                        <button type="button" onClick={closeModal} className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-600">
                                            Cancel
                                        </button>
                                    </form>
                                ) :modalContent === 'listClients' ? (
                                    Array.isArray(selectedTrainerClients) && selectedTrainerClients.length > 0 ? (
                                        <div>
                                            {selectedTrainerClients.map(client => (
                                                <div key={client.id} className="flex items-center space-x-4 p-2 border-b">
                                                    <img
                                                        src={client.profilePic}
                                                        alt={`${client.firstName} ${client.lastName}`}
                                                        width="50"
                                                        height="50"
                                                        className="rounded-full"
                                                    />
                                                    <div className="flex flex-col">
                                                        <span>ID: {client.uid}</span>
                                                        <span>Name: {client.firstName} {client.lastName}</span>
                                                        <span>Email: {client.email}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p>No Clients</p>
                                    )
                                ) : null}
                                    <button type="button" onClick={closeModal} className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-600">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;