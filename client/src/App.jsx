import React, { useEffect, useState } from "react";
import io from 'socket.io-client';
import "./static/css/index.css";
import { BrowserRouter as Router } from "react-router-dom";
import AuthRoutes from "./routes/authRoutes";
import Dashboard from "./pages/Dashboard";
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

    useEffect(() => {
        axios.get('/api/auth/checkAuth')
            .then((response) => {
                if (response.status === 200) {
                    dispatch(setLoggedIn());
                    if (response.data.accessToken) {
                        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
                    }
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

        const newSocket = io('http://localhost:8080');
        setSocket(newSocket);

        return () => newSocket.close();
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
                        className: "bg-gradient-to-br from-dark to-light border border-dark rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200",  // Enhanced styles for the toast container
                    }
                );
            });
        }
    }, [socket, loggedIn]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            {loggedIn ? <Dashboard /> : <AuthRoutes />}
            <ToastContainer
                position="bottom-right"
                className="absolute bottom-0 right-0 mb-6 mr-6 max-w-xs z-50"
            />
        </Router>
    );
}

export default App;