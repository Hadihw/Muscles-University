import React, { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { Link, Router, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import { TypeAnimation } from 'react-type-animation';

function Login() {
  const [password, setPass] = useState({});
  const [email, setEmail] = useState({});
  const [errorMessage, setErrorMessage] = useState(""); // Add this line
  const navigate = useNavigate();

  const login = async () => {
    await axios
      .post("/api/account/login", { email, password })
      .then((res) => {
        localStorage.setItem("uid", res.data._id);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("uname", res.data.name);
        localStorage.setItem("loggedIn", 1);
        navigate("/");
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          setErrorMessage("Invalid email or password.");
        } else {
          setErrorMessage("Something went wrong. Please try again later.");
        }
        console.log("Error", err);
      });
  };

  React.useEffect(() => {
    if (localStorage.getItem("loggedIn") === 1) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-40 w-auto mb-10"
            src="../../assets/images/logo(500x500).png"
            alt="Your Company"
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
        >
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <LockClosedIcon
              className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
              aria-hidden="true"
            />
          </span>
          Sign in
        </button>
      </div>
      <hr />

      <div>
        <Link to="/register">
          <button
            type="submit"
            className="font-axiom group relative flex w-full justify-center rounded-md border border
            border-transparent bg-medium py-2 px-4 text-sm font-medium text-slate-900 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon
                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            Start my fitness journey
          </button>
        </Link>
      </div>
    </form>
  </div>
</div>
);
}

export default Login;