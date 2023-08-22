import React, { useState, useEffect } from "react";

import "./static/css/index.css";
import { BrowserRouter as Router } from "react-router-dom";
import AuthRoutes from "./routes/authRoutes";
import Dashboard from "./pages/Dashboard";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("loggedIn") === "1") {
            setLoggedIn(true);
        }
    }, []);

    return (
        <Router>
            {loggedIn ? (
                <Dashboard />
            ) : (
                <AuthRoutes />
            )}
        </Router>
    );
}

export default App;
