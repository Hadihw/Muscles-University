import React, { useState } from 'react';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import {
	FaHome, FaRunning, FaUserCircle, FaCommentAlt,
	FaApple, FaCalendarAlt, FaSignOutAlt, FaBars, FaLock
} from 'react-icons/fa';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setLoggedOut } from "../../Redux/authSlice";

const NavItem = ({ path, IconComponent, label, lock }) => (
	<NavLink to={path} activeClassName="bg-dark text-white px-4 py-2 rounded-md" className="w-full px-4 py-2 rounded-md flex items-center justify-center lg:justify-start">
		<IconComponent className="w-8 h-8" />
		<span className="lg:inline hidden ml-4">{label}</span>
		{lock && <FaLock className="lg:inline hidden ml-4" />}
	</NavLink>
);

const ClientNavbar = ({ userData }) => {
	const [menuOpen, setMenuOpen] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isGoldOrPlatinum = userData.subscription.type === 'gold' || userData.subscription.type === 'platinum';

	const menuItems = [
		{ path: "/ClientDashboard/Home", IconComponent: FaHome, label: "Home" },
		{ path: "/ClientDashboard/Profile", IconComponent: FaUserCircle, label: "Profile" },
		{ path: "/ClientDashboard/Messages", IconComponent: FaCommentAlt, label: "Messages" },
		{ path: "/ClientDashboard/Nutrition", IconComponent: FaApple, label: "Nutrition", lock: !isGoldOrPlatinum },
		{ path: "/ClientDashboard/Workout", IconComponent: FaRunning, label: "Workout" },
		{ path: "/ClientDashboard/Bookings", IconComponent: FaCalendarAlt, label: "Bookings" }  // Included Bookings
	];

	const logout = async () => {
		try {
			const response = await axios.post('/api/auth/logout');
			if (response.status === 200) {
				dispatch(setLoggedOut());
				localStorage.clear();
				navigate("/login");
				window.location.reload()
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
					<Link to="/ClientDashboard/Home" className="hidden lg:block md:w-20 w-32 lg:w-52 mb-6 lg:mb-10">
						<img src="../../../assets/images/logo(500x500).png" alt="Logo" className="w-full h-auto" />
					</Link>

					<div className="w-full flex flex-col items-center space-y-4">
						{menuItems.map(item => (
							<NavItem
								key={item.path}
								path={item.path}
								IconComponent={item.IconComponent}
								label={item.label}
								lock={item.lock}
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

export default ClientNavbar;