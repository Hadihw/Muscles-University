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
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
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
        try {
            const response = await axios.post('/api/auth/register', { firstName, lastName, email, password, confirmPassword });

            if (response.status === 201) {
                // Successful registration, so redirect to dashboard/home
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
        <div className="flex bg-light h-screen justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full flex-grow flex justify-center">
                <div className="w-full">
                    <img onClick={() => {
                        navigate("/");
                    }}
                         className="mx-auto h-40 w-auto mb-10 cursor-pointer" src="/assets/images/logo(500x500).png" alt="Muscles University" />
                    <h2 className="text-center text-4xl font-bold tracking-tight font-axiom text-dark">
                        <TypeAnimation sequence={['Register Now', 2000, 'Create an Account', 2000]} speed={50} className="" wrapper="span" repeat={Infinity} />
                    </h2>
                    <form className="mt-8 space-y-6" onSubmit={(e) => handleSubmit(e)}>
                        <div className="flex flex-col justify-center items-center container-width-class">
                            {errorMessage && (
                                <div className="w-1/4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                                    {errorMessage}
                                </div>
                            )}
                            <RegisterForm firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} email={email} setEmail={setEmail} password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} />
                        </div>
                        <div className="lg:w-1/4 m-auto space-y-4">
                            <button type="submit" className="m-auto font-axiom group relative flex w-full justify-center rounded-md border border-transparent bg-dark py-2 px-4 text-sm font-medium text-white hover:bg-dark-500 focus:outline-none focus:ring-2 focus:ring-dark-500 focus:ring-offset-2">
                                Register
                            </button>
                            <button onClick={handleGoogleRegister} className="mt-4 m-auto font-axiom group relative flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <img src={googleLogo} alt="Google Logo" className="h-5 w-5" />
                </span>
                                Register with Google
                            </button>
                            <hr />
                            <div>
                                <Link to="/login">
                                    <button type="submit" className="font-axiom group relative flex w-full justify-center rounded-md border border-transparent bg-medium py-2 px-4 text-sm font-medium text-slate-900 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-dark-500 focus:ring-offset-2">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <LockClosedIcon className="h-5 w-5 text-dark-500 group-hover:text-dark-400" aria-hidden="true" />
                    </span>
                                        Have an account? Login
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
