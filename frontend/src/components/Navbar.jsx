import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Helper for safe navigation
  const safeNavigate = (to) => {
    if (!to || to === '#' || to === '') {
      alert('No URL available for this link.');
      return;
    }
    navigate(to);
  };

  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/bluestock-logo.png" alt="Bluestock Logo" className="h-8 mr-2" /> {/* Assuming a logo SVG */}
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex space-x-6">
          <button onClick={() => safeNavigate('#')} className="text-gray-600 hover:text-blue-600">IPO</button>
          <button onClick={() => safeNavigate('#')} className="text-gray-600 hover:text-blue-600">Community</button>
          <button onClick={() => safeNavigate('#')} className="text-gray-600 hover:text-blue-600">Products</button>
          <button onClick={() => safeNavigate('#')} className="text-gray-600 hover:text-blue-600">Brokers <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full ml-1">NEW</span></button>
          <button onClick={() => safeNavigate('#')} className="text-gray-600 hover:text-blue-600">Live News</button>
        </div>

        {/* Auth Buttons (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <button onClick={() => navigate('/signin')} className="text-gray-600 hover:text-blue-600">Sign In</button>
          <button onClick={() => navigate('/signup')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Sign Up Now</button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            className="text-gray-600 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t mt-2">
          <div className="container mx-auto py-4 px-4 space-y-4">
            <button onClick={() => safeNavigate('#')} className="block text-gray-600 hover:text-blue-600 py-2 w-full text-left">IPO</button>
            <button onClick={() => safeNavigate('#')} className="block text-gray-600 hover:text-blue-600 py-2 w-full text-left">Community</button>
            <button onClick={() => safeNavigate('#')} className="block text-gray-600 hover:text-blue-600 py-2 w-full text-left">Products</button>
            <button onClick={() => safeNavigate('#')} className="block text-gray-600 hover:text-blue-600 py-2 w-full text-left">Brokers <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full ml-1">NEW</span></button>
            <button onClick={() => safeNavigate('#')} className="block text-gray-600 hover:text-blue-600 py-2 w-full text-left">Live News</button>
            <div className="pt-4 space-y-2">
              <button onClick={() => navigate('/signin')} className="w-full text-gray-600 hover:text-blue-600 py-2">Sign In</button>
              <button onClick={() => navigate('/signup')} className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Sign Up Now</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 