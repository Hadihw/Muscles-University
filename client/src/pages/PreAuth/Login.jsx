import React, {useEffect, useState} from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import {Link, Router, useLocation, useNavigate} from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import { TypeAnimation } from 'react-type-animation';
import googleLogo from '/assets/images/googleLogo.png';
import app from "../../../Firebase/firebaseConfig";
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

// Axios Response Interceptor
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
  const [errorMessage, setErrorMessage] = useState(""); // Add this line
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

            // Send this token to server for verification
            const response = await fetch("/api/auth/google/googleLogin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ idToken: token }),

            });

            const data = await response.json();

            if (response.status !== 200) {
                setErrorMessage(data.message); // Display the error message from server
                return; // Exit the function to prevent further execution
            }

            // Store the user ID in local storage
            localStorage.setItem('userID', data.uid);

            console.log("Server response:", data);

            // Navigate to ClientDashboard
            navigate("/ClientDashboard/Home");
            window.location.reload();

        } catch (error) {
            console.error(error);
            setErrorMessage("Something went wrong. Please try again later.");
        }
    };

    const login = async () => {
        const auth = getAuth();
        try {
            // Authenticate using Firebase client SDK
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const firebaseToken = await userCredential.user.getIdToken();

            // Send the Firebase ID token to your server
            await axiosInstance
                .post("/auth/login", { firebaseToken })
                .then((res) => {
                    // Store the user ID in local storage
                    localStorage.setItem('userID', res.data.uid);
                    // Navigate to ClientDashboard
                    window.location.reload();
                })
                .catch((err) => {
                    if (err.response && err.response.status === 401) {
                        setErrorMessage("Invalid email or password.");
                    } else {
                        setErrorMessage(err.message || "Something went wrong. Please try again later.");
                    }
                    console.log("Error", err);
                });

        } catch (error) {
            console.error("Firebase error:", error);
            if (error.code) {
                switch (error.code) {
                    case "PreAuth/user-not-found":
                        setErrorMessage("User does not exist.");
                        break;
                    case "PreAuth/wrong-password":
                        const signInMethods = await fetchSignInMethodsForEmail(auth, email);
                        if (signInMethods.includes("google.com")) {
                            setErrorMessage("This email is registered with Google. Please Sign in with Google.");
                            return;
                        } else {
                            setErrorMessage("Invalid Password.");
                        }
                        break;
                    case "PreAuth/invalid-email":
                        setErrorMessage("Invalid email format.");
                        break;
                    //... add more error cases as needed
                    default:
                        setErrorMessage("Firebase authentication failed. Please try again.");
                }
            } else {
                setErrorMessage("Firebase authentication failed. Please try again.");
            }
        }

    };


  return (
    <div className="flex bg-manatee h-screen justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
              onClick={() => {
                  navigate("/");
              }}
            className="mx-auto h-40 w-auto mb-10 cursor-pointer"
            src="/assets/images/logo(500x500).png"
            alt="Muscles University"
          />
          <h2 className="text-center text-4xl font-bold tracking-tight font-axiom text-dark" data-testid="login-title">
            <TypeAnimation
                sequence={[
                  'Welcome Back',
                  2000,
                  'Login',
                  2000

                ]}
                speed={50}
                className=""
                wrapper='span'
                repeat={Infinity}
            />
      </h2>
    </div>
    {errorMessage && (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">{errorMessage}</span>
      </div>
    )}
          {location.state?.registrationSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                  Registration successful!
              </div>
          )}
    <form
      className="mt-8 space-y-6"
      action="#"
      method="POST"
      onSubmit={(e) => {
        e.preventDefault();
        login();
      }}
    >
      <input type="hidden" name="remember" defaultValue="true" />
      <div className="-space-y-px rounded-md shadow-sm">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-dark focus:outline-none focus:ring-dark sm:text-sm"
            placeholder="Email address"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-dark focus:outline-none focus:ring-dark sm:text-sm"
            placeholder="Password"
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-dark focus:ring-dark"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-900"
          >
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <a
            href="#"
            className="font-medium underline text-dark"
          >
            Forgot your password?
          </a>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="font-axiom group relative flex w-full justify-center rounded-md border border-transparent bg-dark py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          style={{
            boxShadow: '0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25)',
            backgroundPosition: '12px 11px',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '18px 18px'
          }}
        >
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <LockClosedIcon
              className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
              aria-hidden="true"
            />
          </span>
          Sign in
        </button>
        <div className="mt-4"> {/* Added margin-top */}
          <button
              type="button"
              onClick={handleGoogleSignIn}
              className="font-axiom group relative flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              style={{
                boxShadow: '0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25)',
                backgroundImage: `url(${googleLogo})`,
                backgroundPosition: '12px 11px',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '18px 18px'
              }}
          >
           <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <img src={googleLogo} alt="Google Logo" className="h-5 w-5" />
        </span>
            Sign in with Google
          </button>
        </div>
      </div>
      <hr />

      <div>
        <Link to="/register">
          <button
            type="submit"
            className="font-axiom group relative flex w-full justify-center rounded-md border border
            border-transparent bg-medium py-2 px-4 text-sm font-medium text-slate-900 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            style={{
              boxShadow: '0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25)',
              backgroundPosition: '12px 11px',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '18px 18px'
            }}
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon
                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            Start your fitness journey
          </button>
        </Link>
      </div>
    </form>
  </div>
</div>
);
}

export default Login;