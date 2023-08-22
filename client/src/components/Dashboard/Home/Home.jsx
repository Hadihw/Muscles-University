import React from 'react';
import {
	FaHeartbeat,
	FaDumbbell,
	FaBox,
	FaChartBar,
	FaChartPie,
	FaUserCircle
} from 'react-icons/fa';

const Home = () => {
	const brandColors = {
		primary: '#FF6B6B',
		secondary: '#FFD166',
		background: '#F7F7F7',
		dark: '#333333',
	};

	const GraphBar = ({ title }) => (
		<div className="bg-white rounded-lg shadow-md p-4 h-72">
			<h3 className="text-lg font-semibold mb-4">{title}</h3>
			<div className="relative h-48">
				{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
					<div key={day} className="absolute bottom-0" style={{ left: `${index * 14 + 1}%` }}>
						<div className={`w-4 bg-primary h-${index + 2}/6`}></div>
						<p className="mt-2 text-xs">{day}</p>
					</div>
				))}
			</div>
		</div>
	);

	const GraphLine = ({ title }) => (
		<div className="bg-white rounded-lg shadow-md p-4 h-72">
			<h3 className="text-lg font-semibold mb-4">{title}</h3>
			<div className="relative h-48">
				{/* Sample line for the line chart - this is just a visual representation */}
				<div className="absolute bottom-0 left-0 w-full h-16 bg-white opacity-40"></div>
				{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
					<p key={day} className="absolute bottom-0 text-xs" style={{ left: `${index * 14 + 1}%` }}>
						{day}
					</p>
				))}
			</div>
		</div>
	);

	return (
		<div className="flex-1 p-8 bg-background">
			{/* Header */}
			<div className="mb-10">
				<h1 className="text-3xl font-bold text-dark mb-4">Welcome, John Doe</h1>
				<div className="bg-white p-5 rounded-lg shadow-md">
					<p className="text-dark">Your last login was on <strong>15th August, 2023</strong> at <strong>14:32 PM</strong></p>
				</div>
			</div>

			{/* Profile Section */}
			<div className="flex bg-white rounded-lg shadow-md p-4 mb-8">
				<FaUserCircle size={120} style={{ color: brandColors.dark }} />
				<div className="ml-8">
					<h2 className="text-2xl font-semibold">John Doe</h2>
					<p className="text-lg mt-2">Member since Jan 2021</p>
					<p className="text-lg">Total Workouts: 50</p>
				</div>
			</div>

			{/* Two side-by-side graphs */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<GraphBar title="Graph 1" />
				<GraphLine title="Graph 2" />
			</div>
		</div>
	);
};

export default Home;