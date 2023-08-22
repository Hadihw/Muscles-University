import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
	FaHome, FaHeartbeat, FaRunning, FaUserCircle, FaCommentAlt,
	FaChartLine, FaCalendarAlt, FaSignOutAlt, FaBars
} from 'react-icons/fa';

const DashboardNavbar = ({ onTabChange }) => {
	const [menuOpen, setMenuOpen] = useState(false);
	const handleTabClick = (tabName) => {
		onTabChange(tabName);
	};

	const navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem("uid");
		localStorage.removeItem("loggedIn");
		navigate("/login");
	};

	return (
		<div>
			<button
				onClick={() => setMenuOpen(!menuOpen)}
				className="lg:hidden text-dark text-xl mb-6 absolute top-3 left-[22px]"
			>
				<FaBars />
			</button>

			<nav className={`bg-gray-300 shadow-2xl h-screen flex flex-col items-center lg:py-6 py-12 space-y-4 ${menuOpen ? 'block' : 'hidden'} lg:block w-full md:w-24 lg:w-52`}>
				<div className="flex flex-col h-full w-full">
					<div className="hidden lg:block md:w-20 w-32 lg:w-52 mb-6 lg:mb-10">
						<NavLink to="/Home" onClick={() => handleTabClick('home')}>
							<img src="../../../assets/images/logo(500x500).png" alt="Logo" className="w-full h-auto mb-6 lg:mb-10" />
						</NavLink>
					</div>

					<div className="w-full flex flex-col items-center space-y-4 flex-grow">
						<NavLink
							to="/Home"
							onClick={() => handleTabClick('home')}
							activeClassName="bg-dark text-white px-4 py-2 rounded-md"
							className="w-full px-4 py-2 rounded-md flex items-center justify-center lg:justify-start"
						>
							<FaHome className="w-8 h-8" />
							<span className="lg:inline hidden ml-4" style={{ width: "100px" }}>Home</span>
						</NavLink>

						<NavLink
							to="/Profile"
							onClick={() => handleTabClick('profile')}
							activeClassName="bg-dark text-white px-4 py-2 rounded-md"
							className="w-full px-4 py-2 rounded-md flex items-center justify-center lg:justify-start"
						>
							<FaUserCircle className="w-8 h-8" />
							<span className="lg:inline hidden ml-4" style={{ width: "100px" }}>Profile</span>
						</NavLink>

						<NavLink
							to="/Messages"
							onClick={() => handleTabClick('messages')}
							activeClassName="bg-dark text-white px-4 py-2 rounded-md"
							className="w-full px-4 py-2 rounded-md flex items-center justify-center lg:justify-start"
						>
							<FaCommentAlt className="w-8 h-8" />
							<span className="lg:inline hidden ml-4" style={{ width: "100px" }}>Messages</span>
						</NavLink>

						<NavLink
							to="/Statistics"
							onClick={() => handleTabClick('statistics')}
							activeClassName="bg-dark text-white px-4 py-2 rounded-md"
							className="w-full px-4 py-2 rounded-md flex items-center justify-center lg:justify-start"
						>
							<FaChartLine className="w-8 h-8" />
							<span className="lg:inline hidden ml-4" style={{ width: "100px" }}>Statistics</span>
						</NavLink>

						<NavLink
							to="/Workout"
							onClick={() => handleTabClick('workout')}
							activeClassName="bg-dark text-white px-4 py-2 rounded-md"
							className="w-full px-4 py-2 rounded-md flex items-center justify-center lg:justify-start"
						>
							<FaRunning className="w-8 h-8" />
							<span className="lg:inline hidden ml-4" style={{ width: "100px" }}>Workout</span>
						</NavLink>

						<NavLink
							to="/Activities"
							onClick={() => handleTabClick('activities')}
							activeClassName="bg-dark text-white px-4 py-2 rounded-md"
							className="w-full px-4 py-2 rounded-md flex items-center justify-center lg:justify-start"
						>
							<FaCalendarAlt className="w-8 h-8" />
							<span className="lg:inline hidden ml-4" style={{ width: "100px" }}>Activities</span>
						</NavLink>
					</div>

					<div className="mt-auto">
						<button
							onClick={logout}
							className="w-full mt-6 px-4 py-2 rounded-md flex items-center justify-center space-x-2 border-transparent hover:text-dark"
						>
							<FaSignOutAlt className="w-8 h-8" />
							<span className="md:hidden hidden lg:inline">Logout</span>
						</button>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default DashboardNavbar;