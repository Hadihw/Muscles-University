import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaSignOutAlt, FaLock } from 'react-icons/fa';

const NavItemComponent = ({ path, IconComponent, label, lock, onClick }) => (
  <NavLink 
    to={path} 
    className={({ isActive }) => 
      `w-full px-4 py-3 flex items-center space-x-3 rounded-lg transition-colors duration-200 ${
        isActive ? 'bg-[#433722] text-white' : 'text-gray-600 hover:bg-[#B7A776] hover:text-[#433722]'
      }`
    }
    onClick={onClick}
  >
    <IconComponent className="w-5 h-5 flex-shrink-0" />
    <span className="text-sm font-medium">{label}</span>
    {lock && <FaLock className="w-4 h-4 ml-auto text-gray-400" />}
  </NavLink>
);

const BaseNavbar = ({ logo, menuItems, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <div className="relative">
      <button 
        onClick={() => setMenuOpen(!menuOpen)} 
        className="lg:hidden fixed top-2 left-2 z-50 w-8 h-8 flex items-center justify-center focus:outline-none"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        <div className="w-6 h-5 relative">
          <span className={`absolute h-0.5 w-full bg-[#433722] rounded-lg transform transition duration-300 ease-in-out ${menuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
          <span className={`absolute h-0.5 w-full bg-[#433722] rounded-lg transform transition duration-300 ease-in-out ${menuOpen ? 'opacity-0' : 'translate-y-2'}`} />
          <span className={`absolute h-0.5 w-full bg-[#433722] rounded-lg transform transition duration-300 ease-in-out ${menuOpen ? '-rotate-45 translate-y-2.5' : 'translate-y-4'}`} />
        </div>
      </button>

      <nav className={`bg-white text-gray-800 h-screen w-64 flex flex-col shadow-lg transition-transform duration-300 ease-in-out ${
        menuOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 fixed lg:relative z-40`}>
        <div className="p-6 flex justify-center border-b border-gray-200">
          <img src={logo} alt="App Logo" className="w-36 h-36" />
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {menuItems.map(item => (
            <NavItemComponent
              key={item.path}
              {...item}
              onClick={() => setMenuOpen(false)}
            />
          ))}
        </div>

        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={onLogout} 
            className="w-full px-4 py-3 flex items-center space-x-3 text-gray-600 hover:bg-[#B7A776] hover:text-[#433722] rounded-lg transition-colors duration-200"
          >
            <FaSignOutAlt className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" 
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default BaseNavbar;