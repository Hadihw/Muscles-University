import React, {lazy, Suspense, useEffect, useState} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import DashboardNavbar from '../../components/Admin/AdminNavbar';
import axios from "axios";
import LoadingIndicator from "../../components/UI/LoadingIndicator";
import {useDispatch} from "react-redux";

// Admin-specific components (replace with the actual ones you have)
const Home = lazy(() => import('../../components/Admin/Home/Home'));
const UserManagement = lazy(() => import('../../components/Admin/UserManagement/UserManagement'));
const ContentManagement = lazy(() => import('../../components/Admin/ContentManagement/ContentManagement'));
const SubscriptionManagement = lazy(() => import('../../components/Admin/SubscriptionManagement/SubscriptionManagement'));
const FeedbackReports = lazy(() => import('../../components/Admin/FeedbackReports/FeedbackReports'));

function RedirectToHome() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/AdminDashboard/Home');
    }, [navigate]);

    return null;
}

const AdminDashboard = () => {

    const dispatch = useDispatch();
    const userID = localStorage.getItem('userID');
    const [adminData, setAdminData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch admin data
        axios.get(`/api/user/users/${userID}`)
            .then(response => {
                const admin = response.data;
                setAdminData(admin);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            });
    }, [dispatch]);

    if (isLoading) {
        return (
            <div className="flex h-screen justify-center items-center">
                <LoadingIndicator/>
            </div>
        );
    }

    return (
        <div className="h-screen w-screen flex bg-gray-200 overflow-hidden">
            <div className="rounded-lg shadow-lg flex-grow flex">
                <div className="border-r border-gray-300">
                    <DashboardNavbar adminData={adminData} />
                </div>
                <div className="flex-1 h-full overflow-hidden">
                    <div className="bg-manatee rounded-lg shadow-lg h-full">
                        <div className="py-2 px-4 md:px-6">
                            <Suspense fallback={
                                <div className="flex h-screen justify-center items-center">
                                    <LoadingIndicator/>
                                </div>
                            }>
                                <Routes>
                                    <Route path="/AdminDashboard/Home" element={<Home userData={adminData}/>} />
                                    <Route path="/AdminDashboard/UserManagement" element={<UserManagement />} />
                                    <Route path="/AdminDashboard/ContentManagement" element={<ContentManagement />} />
                                    <Route path="/AdminDashboard/SubscriptionManagement" element={<SubscriptionManagement />} />
                                    <Route path="/AdminDashboard/FeedbackReports" element={<FeedbackReports />} />
                                    <Route path="/AdminDashboard" element={<RedirectToHome />} />
                                    <Route path="*" element={<RedirectToHome />} />
                                </Routes>
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )};

export default AdminDashboard;