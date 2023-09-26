import React, { useState, useEffect } from 'react';
import LoadingIndicator from "../../UI/LoadingIndicator";
import { FaRunning, FaDumbbell, FaClock, FaSmile } from 'react-icons/fa';

const Workout = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [workoutPlan, setWorkoutPlan] = useState(null);

	useEffect(() => {
		// Simulate fetching workout plans
		setTimeout(() => {
			// Uncomment below line to test with a workout plan
			// setWorkoutPlan("Full Body Workout");
			setIsLoading(false);
		}, 2000);
	}, []);

	if (isLoading) {
		return <LoadingIndicator />;
	}

	return (
		<div className="flex-1 p-8 bg-background relative">
			<div className="flex flex-col items-center justify-center h-screen">
				{workoutPlan ? (
					<>
						<div className="text-dark text-4xl mb-4">
							<FaDumbbell />
						</div>
						<h2 className="text-2xl font-semibold text-dark mb-4">Your Workout Plan</h2>
						<p className="text-xl text-dark">{workoutPlan}</p>
					</>
				) : (
					<>
						<div className="text-dark text-4xl mb-4">
							<FaSmile />
						</div>
						<h2 className="text-2xl font-semibold text-dark mb-4">No Workout Plan Yet</h2>
						<p className="text-xl text-dark">
							Please wait until your trainer assigns you a workout plan.
						</p>
					</>
				)}
			</div>
		</div>
	);
};

export default Workout;