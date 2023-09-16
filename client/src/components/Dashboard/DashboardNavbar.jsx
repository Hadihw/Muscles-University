import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
	FaHome, FaRunning, FaUserCircle, FaCommentAlt,
	FaApple, FaCalendarAlt, FaSignOutAlt, FaBars, FaLock, FaCog, FaUsers, FaDumbbell
} from 'react-icons/fa';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setLoggedOut } from "../../Redux/authSlice";
import withRole from "../HOC/withRole";

const DashboardNavbar = ({ userData }) => {
	const [menuOpen, setMenuOpen] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isTrainer = userData.userRole === 'trainer'; // Assuming userType is a field in userData
	const isGoldOrPlatinum = userData.subscription.type === 'gold' || userData.subscription.type === 'platinum';


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

			<nav className={`bg-white-600 shadow-2xl h-screen flex flex-col items-center lg:py-6 py-12 space-y-4 ${menuOpen ? 'block' : 'hidden'} lg:block w-full md:w-24 lg:w-52`}>
				<div className="flex flex-col h-full w-full">
					<Link to="/Dashboard/Home" className="hidden lg:block md:w-20 w-32 lg:w-52 mb-6 lg:mb-10">
						<img src="../../../assets/images/logo(500x500).png" alt="Logo" className="w-full h-auto" />
					</Link>

					<div className="w-full flex flex-col items-center space-y-4 flex-grow">
						<NavLink to="/Dashboard/Home" activeClassName="bg-dark text-white px-4 py-2 rounded-md" className="w-full px-4 py-2 rounded-md flex items-center justify-center lg:justify-start">
							<FaHome className="w-8 h-8" />
							<span className="lg:inline hidden ml-4">Home</span>
						</NavLink>

						<NavLink to="/Dashboard/Profile" activeClassName="bg-dark text-white px-4 py-2 rounded-md" className="w-full px-4 py-2 rounded-md flex items-center justify-center lg:justify-start">
							<FaUserCircle className="w-8 h-8" />
							<span className="lg:inline hidden ml-4">Profile</span>
						</NavLink>

						{isTrainer ? (
							<>
								<NavLink to="/Dashboard/Clients" activeClassName="bg-dark text-white px-4 py-2 rounded-md" className="w-full px-4 py-2 rounded-md flex items-center justify-center lg:justify-start">
									<FaUsers className="w-8 h-8" />
									<span className="lg:inline hidden ml-4">Clients</span>
								</NavLink>

								<NavLink to="/Dashboard/AssignWorkouts" activeClassName="bg-dark text-white px-4 py-2 rounded-md" className="w-full px-4 py-2 rounded-md flex items-center justify-center lg:justify-start">
									<FaDumbbell className="w-8 h-8" />
									<span className="lg:inline hidden ml-4">Assign Workouts</span>
								</NavLink>
							</>
						) : (
							<>
								<NavLink to="/Dashboard/Messages" activeClassName="bg-dark text-white px-4 py-2 rounded-md" className="w-full px-4 py-2 rounded-md flex items-center justify-center lg:justify-start">
									<FaCommentAlt className="w-8 h-8" />
									<span className="lg:inline hidden ml-4">Messages</span>
								</NavLink>

								<NavLink to="/Dashboard/Nutrition" activeClassName="bg-dark text-white px-4 py-2 rounded-md" className="w-full px-4 py-2 rounded-md flex items-center justify-center lg:justify-start">
									<FaApple className="w-8 h-8" />
									<div className="flex flex-grow justify-between items-center ml-4">
										<span className="lg:inline hidden">Nutrition</span>
										{!isGoldOrPlatinum && <FaLock className="lg:inline hidden" />}
									</div>
								</NavLink>

								<NavLink to="/Dashboard/Workout" activeClassName="bg-dark text-white px-4 py-2 rounded-md" className="w-full px-4 py-2 rounded-md flex items-center justify-center lg:justify-start">
									<FaRunning className="w-8 h-8" />
									<span className="lg:inline hidden ml-4">Workout</span>
								</NavLink>

								<NavLink to="/Dashboard/Bookings" activeClassName="bg-dark text-white px-4 py-2 rounded-md" className="w-full px-4 py-2 rounded-md flex items-center justify-center lg:justify-start">
									<FaCalendarAlt className="w-8 h-8" />
									<span className="lg:inline hidden ml-4">Bookings</span>
								</NavLink>
							</>
						)}
					</div>

					{/* Divider */}
					<div className="w-4/5 h-[1px] bg-gray-300 my-4 mx-auto"></div>

					<div className="w-full flex flex-col items-center space-y-4 mb-4">
						<NavLink to="/Dashboard/Settings" activeClassName="bg-indigo-600 text-white px-4 py-2 rounded-md" className="w-full px-4 py-2 rounded-md flex items-center justify-center lg:justify-start hover:bg-indigo-500 transition duration-200">
							<FaCog className="w-8 h-8" />
							<span className="lg:inline hidden ml-4">Settings</span>
						</NavLink>

						<button onClick={logout} className="w-full px-4 py-2 rounded-md flex items-center justify-center space-x-2 border-transparent hover:text-dark hover:bg-red-200 transition duration-200">
							<FaSignOutAlt className="w-8 h-8" />
							<span className="lg:inline hidden">Logout</span>
						</button>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default DashboardNavbar;