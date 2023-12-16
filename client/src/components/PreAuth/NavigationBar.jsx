import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars } from 'react-icons/fa';
import { FaXmark} from "react-icons/fa6";


const NavigationBar = () => {
    const [transformHeader, setTransformHeader] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (window.location.pathname !== '/') {
            setTransformHeader(true);
        }
    }, []);

    const handleScroll = () => {
        const shouldTransform = window.scrollY > 75;
        if (transformHeader !== shouldTransform) {
            setTransformHeader(shouldTransform);
        }
    };

    const navigateToPath = (path) => {
        if (window.location.pathname === path) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate(path);
        }
    };

    useLayoutEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [transformHeader]);

    const Drawer = ({ isOpen, onClose }) => {

        useEffect(() => {
            if (isOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }, [isOpen]);

        return (
            <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-40 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out flex md:hidden`}>
                <div className="flex flex-col w-64 h-full bg-white overflow-y-auto">
                    {/* Close button aligned to the right */}
                    <div className="flex justify-end p-2">
                        <FaXmark onClick={onClose} className="text-black cursor-pointer"/>
                    </div>
                    {/* Navigation links centered */}
                    <div className="flex flex-col items-center">
                        <a onClick={() => navigateToPath('/')} className="cursor-pointer font-axiom text-dark mb-2">Home</a>
                        <a onClick={() => navigateToPath('/about')} className="cursor-pointer font-axiom text-dark mb-2">About</a>
                        <a onClick={() => navigateToPath('/faqs')} className="cursor-pointer font-axiom text-dark mb-2">FAQs</a>
                        <a onClick={() => navigateToPath('/contactus')} className="cursor-pointer font-axiom text-dark mb-2">Contact Us</a>
                        <a onClick={() => navigateToPath('/login')} className="mx-5 my-2 px-4 py-2 font-axiom text-dark">Login</a>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <header className={`header-transition z-50 flex fixed justify-center md:justify-between items-center w-full top-0 ${transformHeader ? 'bg-white text-gray-800 shadow-lg py-2' : 'text-white py-4'}`}>

            {/* Menu Icon for Mobile */}
            <FaBars className={`absolute top-5 left-5 text-lg ${transformHeader ? 'text-black' : 'text-white'} lg:hidden`} onClick={() => setIsDrawerOpen(true)} />

            {/* Logo */}
            <img onClick={() => navigateToPath('/')} src="/assets/images/logo(500x500).png" alt="Logo" className={`${transformHeader ? 'w-20 h-20' : 'w-28 h-28'} cursor-pointer mx-5`} />


            {/* Mobile Drawer */}
            <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex space-x-6">
                <a onClick={() => navigateToPath('/')} className={`${transformHeader ? 'text-black border-transparent hover:opacity-80 hover:border-black' : 'text-white border-transparent hover:opacity-80 hover:border-light'} border-b-2 cursor-pointer font-axiom`}>Home</a>
                <a onClick={() => navigateToPath('/about')} className={`${transformHeader ? 'text-black border-transparent hover:opacity-80 hover:border-black' : 'text-white border-transparent hover:opacity-80 hover:border-light'} border-b-2 cursor-pointer font-axiom `}>About</a>
                <a onClick={() => navigateToPath('/faqs')} className={`${transformHeader ? 'text-black border-transparent hover:opacity-80 hover:border-black' : 'text-white border-transparent hover:opacity-80 hover:border-light'} border-b-2 cursor-pointer font-axiom `}>FAQs</a>
                <a onClick={() => navigateToPath('/contactus')} className={`${transformHeader ? 'text-black border-transparent hover:opacity-80 hover:border-black' : 'text-white border-transparent hover:opacity-80 hover:border-light'} border-b-2 cursor-pointer font-axiom `}>Contact Us</a>
            </nav>

            {/* Demo button */}
            <button onClick={() => navigateToPath('/login')} className={`hidden btn-light mx-5 w-32 md:block ${transformHeader ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                Login
            </button>
        </header>
    );
};

export default NavigationBar;