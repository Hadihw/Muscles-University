import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaHome, FaUserCircle, FaCommentAlt, FaUsers, 
  FaDumbbell, FaCalendarAlt, FaEnvelopeOpenText
} from 'react-icons/fa';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setLoggedOut } from "../../Redux/authSlice";
import BaseNavbar from '../Navbar/BaseNavbar';

const TrainerNavbar = ({ userData }) => {
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
    <BaseNavbar
      logo="../../../assets/images/logo(500x500).png"
      menuItems={menuItems}
      onLogout={logout}
    />
  );
};

export default TrainerNavbar;