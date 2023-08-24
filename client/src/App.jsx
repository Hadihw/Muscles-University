import React, { useState, useEffect } from "react";
import "./static/css/index.css";
import { BrowserRouter as Router } from "react-router-dom";
import AuthRoutes from "./routes/authRoutes";
import Dashboard from "./pages/Dashboard";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
    const [loggedIn, setLoggedIn] = useLocalStorage("loggedIn", false);

    return (
        <Router>
            {loggedIn ? (
                <div className="transition-opacity duration-500 ease-in opacity-100">
                    <Dashboard />
                </div>
            ) : (
                <div className="transition-opacity duration-500 ease-in opacity-100">
                    <AuthRoutes />
                </div>
            )}
        </Router>
    );
}

export default App;