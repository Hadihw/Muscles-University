import React, { useEffect, useState } from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import googleLogo from '/assets/images/googleLogo.png';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
    return config;
}, (error) => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        // Implement server-side refresh mechanism here
        return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
});

function Login() {
    const location = useLocation();
    const [password, setPass] = useState("");
    const [email, setEmail] = useState(location.state?.email || "");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const handleGoogleSignIn = async () => {
        try {
            provider.setCustomParameters({
                'prompt': 'select_account'
            });
            const result = await signInWithPopup(auth, provider);
            const token = await result.user.getIdToken();

            const response = await fetch("/api/auth/google/googleLogin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ idToken: token }),
            });

            const data = await response.json();

            if (response.status !== 200) {
                setErrorMessage(data.message);
                return;
            }

            localStorage.setItem('userID', data.uid);
            console.log("Server response:", data);
            navigate("/ClientDashboard/Home");
            window.location.reload();
        } catch (error) {
            setErrorMessage("Something went wrong. Please try again later.");
        }
    };

    const login = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const firebaseToken = await userCredential.user.getIdToken();

            await axiosInstance
                .post("/auth/login", { firebaseToken })
                .then((res) => {
                    localStorage.setItem('userID', res.data.uid);
                    window.location.reload();
                })
                .catch((err) => {
                    if (err.response && err.response.status === 401) {
                        setErrorMessage("Invalid email or password.");
                    } else {
                        setErrorMessage(err.message || "Something went wrong. Please try again later.");
                    }
                });
        } catch (error) {
            setErrorMessage("Firebase authentication failed. Please try again.");
        }
    };

    return (
        <div className="flex h-screen bg-lisbonbrown">
            <div className="hidden lg:block lg:w-1/2 relative">
                <img
                    className="object-cover w-full h-full"
                    src="../../public/assets/images/Colossus.PNG"
                    alt="Woman using tablet"
                />
                <div className="absolute inset-0 bg-black opacity-30"></div> {/* Overlay shadow */}
            </div>
            <div className="w-full lg:w-1/2 bg-white p-6 lg:p-12 flex items-center justify-center">
                <div className="w-full max-w-md">
                    <Helmet>
                        <meta charSet="utf-8" />
                        <title>Login</title>
                    </Helmet>
                    <h2 className="text-2xl lg:text-3xl font-bold font-axiom mb-6 text-gray-800">Login</h2>
                    <form onSubmit={(e) => { e.preventDefault(); login(); }} className="space-y-4">
                        {errorMessage && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                {errorMessage}
                            </div>
                        )}
                        {location.state?.registrationSuccess && (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                                Registration successful!
                            </div>
                        )}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 block w-full border-0 border-b-2 border-gray-300 focus:border-dark focus:ring-0 bg-transparent"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="mt-1 block w-full border-0 border-b-2 border-gray-300 focus:border-dark focus:ring-0 bg-transparent"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPass(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-dark focus:ring-white border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>
                            <div className="text-sm">
                                <a href="#" className="font-medium text-dark hover:text-dark">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-dark hover:bg-dark hover:opacity-90"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 flex items-center justify-between">
                        <hr className="w-full border-gray-300" />
                        <span className="px-2 text-gray-500 text-sm">or</span>
                        <hr className="w-full border-gray-300" />
                    </div>
                    <div className="mt-4">
                        <button
                            onClick={handleGoogleSignIn}
                            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark"
                        >
                            <img src={googleLogo} alt="Google Logo" className="h-5 w-5 mr-2" />
                            Sign in with Google
                        </button>
                    </div>
                    <p className="mt-4 text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-dark hover:text-dark">
                            Sign up →
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
