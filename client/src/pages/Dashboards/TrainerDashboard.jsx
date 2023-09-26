import React, {lazy, Suspense, useEffect, useState} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import TrainerNavbar from '../../components/Trainer/TrainerNavbar';
import axios from "axios";
import LoadingIndicator from "../../components/UI/LoadingIndicator";
import {useDispatch} from "react-redux";

// Trainer-specific components (you can replace these with the actual ones you have)
const Home = lazy(() => import('../../components/Trainer/Home/Home'));
const Profile = lazy(() => import('../../components/Trainer/Profile/Profile'));
const Clients = lazy(() => import('../../components/Trainer/Clients/Clients'));
const WorkoutBuilder = lazy(() => import('../../components/Trainer/AssignWorkouts/AssignWorkouts'));
const Schedule = lazy(() => import('../../components/Trainer/Schedule/Schedule'));
const FeedbackReports = lazy(() => import('../../components/Trainer/FeedbackReports/FeedbackReports'));
function RedirectToHome() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/TrainerDashboard/Home');
    }, [navigate]);

    return null;
}

const TrainerDashboard = () => {

    const dispatch = useDispatch();
    const userID = localStorage.getItem('userID');
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    // You can add any trainer-specific middleware here.

    useEffect(() => {
        // Fetch trainer data
        axios.get(`/api/user/users/${userID}`)
            .then(response => {
                const user = response.data;
                setUserData(user);
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
                    <TrainerNavbar userData={userData} />
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
                                    <Route path="/TrainerDashboard/Home" element={<Home userData={userData}/>} />
                                    <Route path="/TrainerDashboard/Profile" element={<Profile userData={userData}/>} />
                                    <Route path="/TrainerDashboard/Clients" element={<Clients/>} />
                                    <Route path="/TrainerDashboard/WorkoutBuilder" element={<WorkoutBuilder/>} />
                                    <Route path="/TrainerDashboard/Schedule" element={<Schedule/>} />
                                    <Route path="/TrainerDashboard/FeedbackReports" element={<FeedbackReports/>} />
                                    <Route path="/TrainerDashboard" element={<RedirectToHome />} />
                                    <Route path="*" element={<RedirectToHome />} />
                                </Routes>
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )};

export default TrainerDashboard;