import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/bluestock-logo.png" alt="Bluestock Logo" className="h-8 mr-2" /> {/* Assuming a logo SVG */}

        </div>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-blue-600">IPO</a>
          <a href="#" className="text-gray-600 hover:text-blue-600">Community</a>
          <a href="#" className="text-gray-600 hover:text-blue-600">Products</a>
          <a href="#" className="text-gray-600 hover:text-blue-600">Brokers <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full ml-1">NEW</span></a>
          <a href="#" className="text-gray-600 hover:text-blue-600">Live News</a>
        </div>

        {/* Auth Buttons (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="text-gray-600 hover:text-blue-600">Sign In</button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Sign Up Now</button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-gray-600 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 