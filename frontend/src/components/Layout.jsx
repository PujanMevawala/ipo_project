import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function Layout({ children }) {
  const { signout, user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSignout = () => {
    signout();
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold text-blue-800">Bluestock Fintech</h1>
        </div>
        <nav className="mt-4">
          <ul>
            <li>
              <Link to="/dashboard" className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-200">
                <span className="mr-2">📊</span> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/manage-ipo" className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-200">
                <span className="mr-2">📋</span> Manage IPO
              </Link>
            </li>
            <li>
              <Link to="/ipo-information" className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-200">
                <span className="mr-2">ℹ️</span> IPO Information
              </Link>
            </li>
            {/* Add other sidebar links as needed */}
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex justify-between items-center p-4 bg-white shadow-md">
          <div className="flex items-center">
            <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 border border-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-100 focus:outline-none text-gray-700 placeholder-gray-500"
              />
            </div>
          </div>
          <div className="flex items-center">
            <span className="mr-4 text-gray-700">Hi, {user ? user.name : 'Guest'} 👋</span>
            
            {/* User profile dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                {/* User profile picture or initial */}
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold overflow-hidden">
                  {user && user.picture ? (
                    <img 
                      src={user.picture} 
                      alt={user.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-500 flex items-center justify-center">
                      {user && user.name ? user.name.charAt(0).toUpperCase() : 'V'}
                    </div>
                  )}
                </div>
                
                {/* Dropdown arrow */}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <button
                    onClick={handleSignout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Notification icon */}
            <div className="ml-4 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout; 