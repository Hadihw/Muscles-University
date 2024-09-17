import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import Login from "../pages/PreAuth/Login";
import Register from "../pages/PreAuth/Register";
import LandingPage from "../pages/PreAuth/Landing";
import ContactUs from "../pages/PreAuth/ContactUs";
import Faqs from "../pages/PreAuth/Faqs";
import About from "../pages/PreAuth/About";
import ComingSoon from "../pages/PreAuth/ComingSoon";

function RedirectToLanding() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/');
    }, [navigate]);

    return null;
}

function AuthRoutes() {
    return (
        <Routes>
            {/*<Route path="/comingsoon" element={<ComingSoon />} />*/}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About/>} />
            <Route path="/faqs" element={<Faqs/>} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="*" element={<RedirectToLanding />} />
        </Routes>
    );
}

export default AuthRoutes;