import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import LoadingIndicator from "../../UI/LoadingIndicator";

// Adjusted fetchMessages to take in otherUserId
const fetchMessages = (userId, trainerId) => {
	if (trainerId) {
		return axios.get(`/api/messages/getMessages/${userId}?trainerId=${trainerId}`);
	} else {
		return axios.get(`/api/messages/getMessages/${userId}`);
	}
};

const fetchTrainers = () => axios.get('/api/user/getAllTrainers');
const sendMessage = (senderId, recipientId, content) => axios.post('/api/messages/sendMessage', { senderId, recipientId, content });
const deleteMessage = (messageId) => axios.delete(`/api/messages/deleteMessage/${messageId}`);





const formatTimestamp = (timestamp) => {
	if (!timestamp || !timestamp._seconds) {
		return "Unknown Date";  // or any other default value
	}

	const currentDate = new Date();
	const messageDate = new Date((timestamp._seconds * 1000) + (timestamp._nanoseconds / 1000000));
	const diffInDays = Math.floor((currentDate - messageDate) / (1000 * 60 * 60 * 24));
	const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	let hours = messageDate.getHours();
	const minutes = messageDate.getMinutes();
	const ampm = hours >= 12 ? 'PM' : 'AM';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	const timeString = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;

	if (diffInDays === 0) {
		return `Today at ${timeString}`;
	} else if (diffInDays === 1) {
		return `Yesterday at ${timeString}`;
	} else if (diffInDays < 7) {
		return daysOfWeek[messageDate.getDay()];
	} else {
		return `${messageDate.toLocaleDateString("en-US", {
			month: 'short',
			day: 'numeric'
		})} at ${timeString}`;
	}
};
const TrainerList = ({ trainers, currentTrainerId, onTrainerSelect }) => (
	<div className="border-r border-gray-300 flex-initial w-1/4 space-y-4 pr-4 overflow-y-auto">
		<h2 className="text-2xl font-semibold mb-4">Trainers</h2>
		{trainers.map(trainer => (
			<div
				key={trainer.uid}
				className={`mb-3 p-4 flex items-center cursor-pointer hover:bg-gray-200 ${currentTrainerId === trainer.uid ? 'bg-gray-100' : ''}`}
				onClick={() => onTrainerSelect(trainer.uid)}
			>
				<img src={trainer.profilePic || 'https://via.placeholder.com/40'} alt="Trainer" className="w-10 h-10 rounded-full mr-3" />
				<span>{trainer.firstName} {trainer.lastName}</span>
			</div>
		))}
	</div>
);

const MessageList = ({ messages, currentUserId, onMessageClick, trainers, selectedMessageId }) => (
	<div className="messages mb-4 h-5/6 overflow-y-scroll flex flex-col-reverse">
		{messages.map(message => (
			<div
				key={message.id}
				onClick={() => onMessageClick(message.id)}
				className={`message-item mb-2 p-2 hover:bg-gray-100 flex ${message.senderId === currentUserId ? "justify-end" : "justify-start"} max-w-1/2`}
			>
				{message.senderId !== currentUserId && (
					<img
						src={trainers.find(t => t.uid === message.senderId)?.profilePic || 'https://via.placeholder.com/40'}
						alt="Sender"
						className="w-10 h-10 rounded-full mr-2"
					/>
				)}
				<div className={`flex flex-col ${message.senderId === currentUserId ? "items-end" : "items-start"}`}>
					<strong className={message.senderId === currentUserId ? 'text-blue-500' : 'text-black'}>
						{message.senderId === currentUserId ? "You" : trainers.find(t => t.uid === message.senderId)?.firstName}
					</strong>
					<p className="flex-grow">
						{message.content}
					</p>
					<span className={`text-xs text-gray-400 mt-1 inline-block ${message.id === selectedMessageId ? '' : 'hidden'}`}>
                        {formatTimestamp(message.timestamp)}
                    </span>
				</div>
				{message.senderId === currentUserId && (
					<img
						src={trainers.find(t => t.uid === message.senderId)?.profilePic || 'https://via.placeholder.com/40'}
						alt="Sender"
						className="w-10 h-10 rounded-full ml-2"
					/>
				)}
			</div>
		))}
	</div>
);

const MessageInput = ({ onSendMessage, message, setMessage }) => (
	<div className="flex mt-2">
    <textarea
		autoFocus
		onKeyDown={e => {
			if (e.key === 'Enter' && !e.shiftKey) {
				e.preventDefault();
				onSendMessage();
			}
		}}
		className="resize-none flex-grow p-2 mr-2 rounded border-gray-300 shadow focus:border-dark focus:ring-0"
		rows="2"
		value={message}
		onChange={e => setMessage(e.target.value)}
		placeholder="Type your message..."
	></textarea>
		<button
			className="px-4 py-2 bg-dark text-white rounded hover:bg-black focus:outline-none focus:ring-2 focus:ring-dark"
			onClick={onSendMessage}
		>
			Send
		</button>
	</div>
);


const Messages = () => {
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [recipientId, setRecipientId] = useState("");
	const [trainers, setTrainers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const currentUserId = localStorage.getItem('userID');
	const [selectedMessageId, setSelectedMessageId] = useState(null);


	// Load messages for a specific trainer or user
	const loadMessagesForUser = (otherUserId) => {
		setIsLoading(true);
		fetchMessages(currentUserId, otherUserId)
			.then((response) => {
				console.log("Fetched messages:", response.data);
				if (response.data[0] && response.data[0].timestamp) {
					console.log("First message timestamp:", response.data[0].timestamp);
				}
				setMessages(response.data);
				setIsLoading(false);
			})
			.catch((err) => {
				setError('Error fetching messages. Please try again.');
				setIsLoading(false);
			});
	};

	useEffect(() => {
		const socket = io('http://localhost:8080');

		socket.on('messagesUpdate', (updatedMessages) => {
			setMessages(updatedMessages);
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	useEffect(() => {
		setError(null);

		Promise.all([fetchMessages(currentUserId), fetchTrainers()])
			.then(([messagesResponse, trainersResponse]) => {
				const fetchedMessages = messagesResponse.data;
				setMessages(fetchedMessages);

				const sortedTrainers = trainersResponse.data.sort((a, b) => {
					const lastMessageA = fetchedMessages.find(msg => msg.senderId === a.uid || msg.recipientId === a.uid);
					const lastMessageB = fetchedMessages.find(msg => msg.senderId === b.uid || msg.recipientId === b.uid);
					return (lastMessageB?.timestamp?.seconds || 0) - (lastMessageA?.timestamp?.seconds || 0);
				});

				setTrainers(sortedTrainers);
				setRecipientId(sortedTrainers[0]?.uid || "");
				setIsLoading(false);
			})
			.catch(err => {
				setError('Error fetching data. Please try again.');
				setIsLoading(false);
			});
	}, [currentUserId]);

	// Load messages when the recipientId changes
	useEffect(() => {
		if (recipientId) {
			loadMessagesForUser(recipientId);
		}
	}, [recipientId]);

	const handleSendMessage = () => {
		if (!recipientId.trim() || !newMessage.trim()) return;

		sendMessage(currentUserId, recipientId, newMessage)
			.then(() => {
				const tempTimestamp = {
					_seconds: Math.floor(Date.now() / 1000),  // Convert current date/time to seconds
					_nanoseconds: (Date.now() % 1000) * 1000000  // Convert milliseconds to nanoseconds
				};

				setNewMessage("");
			})
			.catch(err => {
				console.error("Error sending message:", err);
			});
	};

	const handleTextareaKeyDown = (e) => {
		if (e.key === 'Enter' && !e.shiftKey) { // Check if the key pressed is Enter and Shift is not held down
			e.preventDefault(); // Prevent the default behavior (new line insertion)
			handleSendMessage();
		}
	};
	const currentTrainer = trainers.find(t => t.uid === recipientId);

	if (isLoading) {
		return <LoadingIndicator />;
	}
	if (error) return (
		<div className="h-screen w-full flex items-center justify-center text-xl text-red-500">
			{error}
		</div>
	);

	return (
		<div className="h-screen w-full bg-background flex items-center justify-center">
			<div className="p-6 bg-white shadow rounded-lg flex h-5/6 w-3/4">
				<TrainerList trainers={trainers} currentTrainerId={recipientId} onTrainerSelect={setRecipientId} />
				<div className="flex-grow w-3/4 max-w-3/4 pl-4">
					{currentTrainer && (
						<div className="flex items-center border-b border-gray-300 pb-2 mb-2">
							<img src={currentTrainer.profilePic || 'https://via.placeholder.com/40'} alt="Trainer" className="w-10 h-10 rounded-full mr-3" />
							<span className="text-lg font-semibold">{currentTrainer.firstName} {currentTrainer.lastName}</span>
						</div>
					)}
					<MessageList
						messages={messages}
						currentUserId={currentUserId}
						onMessageClick={setSelectedMessageId}
						trainers={trainers}
						selectedMessageId={selectedMessageId}
					/>
					<MessageInput onSendMessage={handleSendMessage} message={newMessage} setMessage={setNewMessage} />
				</div>
			</div>
		</div>
	);
};

export default Messages;