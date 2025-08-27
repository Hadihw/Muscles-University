import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaHome, FaRunning, FaUserCircle, FaCommentAlt,
  FaApple, FaCalendarAlt
} from 'react-icons/fa';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setLoggedOut } from "../../Redux/authSlice";
import BaseNavbar from '../Navbar/BaseNavbar';

const ClientNavbar = ({ userData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isGoldOrPlatinum = userData.subscription.type === 'gold' || userData.subscription.type === 'platinum';

  const menuItems = [
    { path: "/ClientDashboard/Home", IconComponent: FaHome, label: "Home" },
    { path: "/ClientDashboard/Profile", IconComponent: FaUserCircle, label: "Profile" },
    { path: "/ClientDashboard/Messages", IconComponent: FaCommentAlt, label: "Messages" },
    { path: "/ClientDashboard/Nutrition", IconComponent: FaApple, label: "Nutrition", lock: !isGoldOrPlatinum },
    { path: "/ClientDashboard/Workout", IconComponent: FaRunning, label: "Workout" },
    { path: "/ClientDashboard/Bookings", IconComponent: FaCalendarAlt, label: "Bookings" }
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
    <BaseNavbar
      logo="../../../assets/images/logo(500x500).png"
      menuItems={menuItems}
      onLogout={logout}
    />
  );
};

export default ClientNavbar;