import React, { useState } from 'react';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import {
	FaHome, FaUserCircle, FaCommentAlt, FaSignOutAlt,
	FaBars, FaUsers, FaDumbbell, FaCalendarAlt, FaEnvelopeOpenText
} from 'react-icons/fa';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setLoggedOut } from "../../Redux/authSlice";

const NavItem = ({ path, IconComponent, label }) => (
	<NavLink 
		to={path} 
		className={({ isActive }) => 
			`w-full px-4 py-2 rounded-md flex items-center justify-center lg:justify-start ${
				isActive ? "bg-dark text-white" : ""
			}`
		}
	>
		<IconComponent className="w-8 h-8" />
		<span className="lg:inline hidden ml-4">{label}</span>
	</NavLink>
);

const TrainerNavbar = ({ userData }) => {
	const [menuOpen, setMenuOpen] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const menuItems = [
		{ path: "/TrainerDashboard/Home", IconComponent: FaHome, label: "Home" },
		{ path: "/TrainerDashboard/Profile", IconComponent: FaUserCircle, label: "Profile" },
		{ path: "/TrainerDashboard/Clients", IconComponent: FaUsers, label: "Clients" },
		{ path: "/TrainerDashboard/Messages", IconComponent: FaCommentAlt, label: "Messages" },
		{ path: "/TrainerDashboard/WorkoutBuilder", IconComponent: FaDumbbell, label: "Workout Builder" },
		{ path: "/TrainerDashboard/Schedule", IconComponent: FaCalendarAlt, label: "Schedule" },
		{ path: "/TrainerDashboard/FeedbackReports", IconComponent: FaEnvelopeOpenText, label: "Feedback & Reports" }
	];

	const logout = async () => {
		try {
			const response = await axios.post('/api/auth/logout');
			if (response.status === 200) {
				dispatch(setLoggedOut());
				localStorage.clear();
				navigate("/login");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-dark text-xl mb-6 absolute top-3 left-[22px]">
				<FaBars />
			</button>

			<nav className={`bg-white-600 shadow-2xl h-screen flex flex-col items-center justify-between lg:py-6 py-12 space-y-4 ${menuOpen ? 'block' : 'hidden'} lg:block w-full md:w-24 lg:w-52`}>
				<div className="flex flex-col w-full">
					<Link to="/TrainerDashboard/Home" className="hidden lg:block md:w-20 w-32 lg:w-52 mb-6 lg:mb-10">
						<img src="../../../assets/images/logo(500x500).png" alt="Logo" className="w-full h-auto" />
					</Link>

					<div className="w-full flex flex-col items-center space-y-4">
						{menuItems.map(item => (
							<NavItem
								key={item.path}
								path={item.path}
								IconComponent={item.IconComponent}
								label={item.label}
							/>
						))}
					</div>
				</div>

				<div className="w-full flex flex-col items-center space-y-4 mb-4">
					{/* Divider */}
					<div className="w-4/5 h-[1px] bg-gray-300 my-4 mx-auto"></div>

					<button onClick={logout} className="w-full px-4 py-2 rounded-md flex items-center justify-center space-x-2 border-transparent hover:text-dark hover:bg-red-200 transition duration-200">
						<FaSignOutAlt className="w-8 h-8" />
						<span className="lg:inline hidden">Logout</span>
					</button>
				</div>
			</nav>
		</div>
	);
};

export default TrainerNavbar;