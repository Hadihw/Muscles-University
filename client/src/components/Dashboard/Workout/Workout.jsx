import React from 'react';
import { FaRunning } from 'react-icons/fa';
import Camera from "../../Camera/Camera";

const Workout = () => {
	const brandColors = {
		medium: '#9F8157',
		dark: '#745228',
		light: '#FBEDC7',
	};

	const Card = ({ title, icon: Icon, children }) => (
		<div className="flex flex-col bg-white rounded-lg shadow-xl p-6 h-full">
			<div className="flex items-center mb-5">
				<Icon size={30} style={{ color: brandColors.dark }} />
				<h3 className="text-2xl font-bold ml-4">{title}</h3>
			</div>
			{children}
		</div>
	);

	return (
		<div className="h-screen flex flex-col justify-center items-center bg-light">
			<div className="w-3/4 lg:w-1/2 xl:w-2/5">
				<div className="bg-white rounded-lg shadow-xl p-8">
					<h3 className="text-2xl font-semibold mb-5 flex items-center">
						<FaRunning size={30} className="text-dark mr-3"/>
						Form Correction
					</h3>
					<Camera />
				</div>
			</div>
		</div>
	);
};


export default Workout;