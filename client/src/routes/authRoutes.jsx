import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import Login from "../pages/PreAuth/Login";
import Register from "../pages/PreAuth/Register";

function RedirectToLogin() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/login');
    }, [navigate]);

    return null;
}

function AuthRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<RedirectToLogin />} />
        </Routes>
    );
}

export default AuthRoutes;