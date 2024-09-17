import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { TypeAnimation } from "react-type-animation";
import RegisterForm from "../../components/Register/RegisterForm";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import googleLogo from '/assets/images/googleLogo.png';
import { useNavigate } from "react-router-dom";

function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const navigate = useNavigate();

    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const handleGoogleRegister = async () => {
        try {
            provider.setCustomParameters({
                'prompt': 'select_account'
            });
            const result = await signInWithPopup(auth, provider);
            const idToken = await result.user.getIdToken();
            const response = await axios.post('/api/auth/google/googleRegister', { idToken });
            if (response.status === 200) {
                navigate("/Login", {
                    state: {
                        registrationSuccess: true
                    }
                });
            }
        } catch (error) {
            setErrorMessage('Error registering with Google. Please try again.');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!agreeToTerms) {
            setErrorMessage("Please agree to the Terms of Use.");
            return;
        }
        try {
            const response = await axios.post('/api/auth/register', { firstName, lastName, email, username, password, confirmPassword });

            if (response.status === 201) {
                navigate("/Login", {
                    state: {
                        email: email,
                        registrationSuccess: true
                    }
                });
            } else {
                setErrorMessage("Unexpected response from the server.");
            }
        } catch (err) {
            if (err.response?.data?.error) {
                setErrorMessage(err.response.data.error);
            }
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
                    <h2 className="text-2xl lg:text-3xl font-bold font-axiom mb-6 text-gray-800">Sign Up</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {errorMessage && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                {errorMessage}
                            </div>
                        )}
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    className="mt-1 block w-full border-0 border-b-2 border-gray-300 focus:border-dark focus:ring-0 bg-transparent"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    className="mt-1 block w-full border-0 border-b-2 border-gray-300 focus:border-dark focus:ring-0 bg-transparent"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
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
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <input
                                type="text"
                                id="username"
                                className="mt-1 block w-full border-0 border-b-2 border-gray-300 focus:border-dark focus:ring-0 bg-transparent"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className="mt-1 block w-full border-0 border-b-2 border-gray-300 focus:border-dark focus:ring-0 bg-transparent"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex items-center">
                            <input
                                id="agreeToTerms"
                                type="checkbox"
                                className="h-4 w-4 text-dark focus:ring-white border-gray-300 rounded"
                                checked={agreeToTerms}
                                onChange={(e) => setAgreeToTerms(e.target.checked)}
                                required
                            />
                            <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-900">
                                I agree to the Terms of Use
                            </label>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-dark hover:bg-dark hover:opacity-90"
                            >
                                Sign Up
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
                            onClick={handleGoogleRegister}
                            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark"
                        >
                            <img src={googleLogo} alt="Google Logo" className="h-5 w-5 mr-2" />
                            Register with Google
                        </button>
                    </div>
                    <p className="mt-4 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-dark hover:text-dark hover:opacity-90">
                            Sign in →
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;