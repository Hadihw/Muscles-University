import React, { useState } from 'react';
import { FaApple, FaDumbbell, FaUser } from 'react-icons/fa';

const ProfileInput = ({ label, value, onChange, isEditing }) => {
	return (
		<div className="mb-4 flex items-center border-b pb-2">
			<label className="block flex-grow text-gray-600 text-sm font-medium mb-2">
				{label}
			</label>
			{isEditing ? (
				<input
					value={value}
					onChange={onChange}
					className="w-2/5 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				/>
			) : (
				<span className="w-2/5 text-gray-600">{value}</span>
			)}
		</div>
	);
};

const ProfileCategory = ({ title, icon: Icon, children }) => {
	return (
		<div className="flex-1 space-y-4 p-6 bg-white shadow rounded-lg">
			<h2 className="text-xl font-semibold mb-4 flex items-center">
				<Icon size={24} className="text-blue-500 mr-4" />
				{title}
			</h2>
			{children}
		</div>
	);
};

const Profile = () => {
	const [isEditing, setIsEditing] = useState(false);
	const [name, setName] = useState('John Doe');
	const [email, setEmail] = useState('johndoe@example.com');
	const [gender, setGender] = useState('Male');
	const [age, setAge] = useState('30');
	const [height, setHeight] = useState("5'10\"");
	const [calories, setCalories] = useState('2000');
	const [fat, setFat] = useState('70g');
	const [protein, setProtein] = useState('150g');
	const [carbs, setCarbs] = useState('250g');
	const [workoutLocation, setWorkoutLocation] = useState('Gym');
	const [currentWeight, setCurrentWeight] = useState('180 lbs');
	const [goalWeight, setGoalWeight] = useState('160 lbs');
	const [fitnessGoal, setFitnessGoal] = useState('Lose weight');

	return (
		<div className="h-full w-full p-8">
			<div className="bg-white rounded-lg shadow-lg p-8 mb-8 flex items-center max-w-4xl mx-auto">
				<img
					src="https://via.placeholder.com/100"
					alt="Profile"
					className="rounded-full w-24 h-24"
				/>
				<div className="ml-8">
					<h2 className="text-2xl font-semibold">{name}</h2>
					<p className="text-lg mt-2 text-dark">{email}</p>
				</div>
				<div className="ml-auto">
					<button onClick={() => setIsEditing(!isEditing)} className="bg-blue-500 text-white px-4 py-2 rounded">
						{isEditing ? 'Save Changes' : 'Edit Profile'}
					</button>
				</div>
			</div>

			<div className="flex flex-col md:flex-row max-w-4xl mx-auto space-y-4 md:space-y-0 md:space-x-8">
				<ProfileCategory title="Personal Details" icon={FaUser}>
					<ProfileInput
						label="Gender"
						value={gender}
						onChange={(e) => setGender(e.target.value)}
						isEditing={isEditing}
					/>
					<ProfileInput
						label="Age"
						value={age}
						onChange={(e) => setAge(e.target.value)}
						isEditing={isEditing}
					/>
					<ProfileInput
						label="Height"
						value={height}
						onChange={(e) => setHeight(e.target.value)}
						isEditing={isEditing}
					/>
				</ProfileCategory>

				<ProfileCategory title="Nutrition" icon={FaApple}>
					<ProfileInput
						label="Calories"
						value={calories}
						onChange={(e) => setCalories(e.target.value)}
						isEditing={isEditing}
					/>
					<ProfileInput
						label="Fat"
						value={fat}
						onChange={(e) => setFat(e.target.value)}
						isEditing={isEditing}
					/>
					<ProfileInput
						label="Protein"
						value={protein}
						onChange={(e) => setProtein(e.target.value)}
						isEditing={isEditing}
					/>
					<ProfileInput
						label="Carbs"
						value={carbs}
						onChange={(e) => setCarbs(e.target.value)}
						isEditing={isEditing}
					/>
				</ProfileCategory>

				<ProfileCategory title="Workout & Fitness" icon={FaDumbbell}>
					<ProfileInput
						label="Workout Location"
						value={workoutLocation}
						onChange={(e) => setWorkoutLocation(e.target.value)}
						isEditing={isEditing}
					/>
					<ProfileInput
						label="Current Weight"
						value={currentWeight}
						onChange={(e) => setCurrentWeight(e.target.value)}
						isEditing={isEditing}
					/>
					<ProfileInput
						label="Goal Weight"
						value={goalWeight}
						onChange={(e) => setGoalWeight(e.target.value)}
						isEditing={isEditing}
					/>
					<ProfileInput
						label="Fitness Goal"
						value={fitnessGoal}
						onChange={(e) => setFitnessGoal(e.target.value)}
						isEditing={isEditing}
					/>
				</ProfileCategory>
			</div>
		</div>
	);
};

export default Profile;