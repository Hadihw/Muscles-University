import React, { useEffect, useState } from "react";
import io from 'socket.io-client';
import "./static/css/index.css";
import { BrowserRouter as Router } from "react-router-dom";
import AuthRoutes from "./routes/authRoutes";
import ClientDashboard from "./pages/Dashboards/ClientDashboard";
import TrainerDashboard from "./pages/Dashboards/TrainerDashboard";
import AdminDashboard from "./pages/Dashboards/AdminDashboard";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setLoggedIn, setLoggedOut, setLoading, selectLoggedIn, selectLoading } from './Redux/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/images/logo(500x500).png';

function App() {
    const loggedIn = useSelector(selectLoggedIn);
    const loading = useSelector(selectLoading);
    const dispatch = useDispatch();
    const [socket, setSocket] = useState(null);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        axios.get('/api/auth/checkAuth')
            .then(async (response) => {
                if (response.status === 200) {
                    dispatch(setLoggedIn());
                    if (response.data.accessToken) {
                        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
                    }
                    const userID = localStorage.getItem('userID');
                    const user = await axios.get(`/api/user/users/${userID}`);
                    setUserRole(user.data.userRole);

                    // Initialize the socket connection only when user is confirmed logged in
                    const newSocket = io('http://localhost:8080');
                    setSocket(newSocket);

                } else {
                    dispatch(setLoggedOut());
                }
            })
            .catch((error) => {
                dispatch(setLoggedOut());
            })
            .finally(() => {
                dispatch(setLoading(false));
            });

        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, [dispatch]);

    useEffect(() => {
        if (!socket) return;

        if (loggedIn) {
            const userID = localStorage.getItem('userID');
            socket.emit('join', userID);

            socket.on('newMessage', (message) => {
                console.log("Received new message:", message);

                toast(
                    <div className="flex items-start space-x-4 p-3">
                        <img src={message.senderProfilePic || logo} alt="Sender Profile" className="w-10 h-10 rounded-full" />
                        <div className="text-sm flex flex-col">
                            <div className=" font-bold  mb-1">
                                New Message!
                            </div>
                            <span className="font-sm font-semibold text-gray-800">{message.senderName}</span>
                            <span className="text-gray-700 mt-1">{message.content}</span>
                        </div>
                    </div>, {
                        position: "bottom-right",
                        autoClose: 4000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        className: "bg-gradient-to-br from-dark to-light border border-dark rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200",
                    }
                );
            });
        }
    }, [socket, loggedIn]);

    const renderDashboard = () => {
        if (!loggedIn) {
            return <AuthRoutes />;
        }

        switch(userRole) {
            case 'client':
                return <ClientDashboard />;
            case 'trainer':
                return <TrainerDashboard />;
            case 'admin':
                return <AdminDashboard />;
            default:
                return <ClientDashboard />; // Redirect users with unknown roles to the ClientDashboard
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            {renderDashboard()}
            <ToastContainer
                position="bottom-right"
                className="absolute bottom-0 right-0 mb-6 mr-6 max-w-xs z-50"
            />
        </Router>
    );
}

export default App;
