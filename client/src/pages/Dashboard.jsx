import React, { useState, useEffect } from 'react';
import DashNav from '../components/Dashboard/DashboardNavbar';
import Home from '../components/Dashboard/Home/Home';
import Profile from '../components/Dashboard/Profile/Profile';
import { useNavigate } from 'react-router-dom';
import Workout from "../components/Dashboard/Workout/Workout";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('home');

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    };

    const isLoggedIn = localStorage.getItem('loggedIn');
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    return (
        <>
            {isLoggedIn && (
                <div className="h-screen w-full flex bg-gray-200 overflow-hidden">
                    <div className="rounded-lg shadow-lg flex-grow flex">
                        <div className="border-r border-gray-300">
                            <DashNav onTabChange={handleTabChange} />
                        </div>
                        <div className="flex-1 h-full overflow-hidden">
                            <div className="bg-light rounded-lg shadow-lg h-full overflow-y-auto">
                                <div className="py-2 px-4 md:px-6">
                                    {activeTab === 'home' && <Home />}
                                    {activeTab === 'profile' && <Profile />}
                                    {activeTab === 'workout' && <Workout />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Dashboard;