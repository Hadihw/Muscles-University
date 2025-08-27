import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaHome, FaUsers, FaLeaf, FaChartPie, FaEnvelopeOpenText
} from 'react-icons/fa';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setLoggedOut } from "../../Redux/authSlice";
import BaseNavbar from '../Navbar/BaseNavbar';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menuItems = [
    { path: "/AdminDashboard/Home", IconComponent: FaHome, label: "Home" },
    { path: "/AdminDashboard/UserManagement", IconComponent: FaUsers, label: "User Management" },
    { path: "/AdminDashboard/ContentManagement", IconComponent: FaLeaf, label: "Content Management" },
    { path: "/AdminDashboard/SubscriptionManagement", IconComponent: FaChartPie, label: "Subscription Management" },
    { path: "/AdminDashboard/FeedbackReports", IconComponent: FaEnvelopeOpenText, label: "Feedback & Reports" },
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

export default AdminNavbar;