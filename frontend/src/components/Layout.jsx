import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function Layout({ children }) {
  const { signout, user } = useAuth();

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
            {/* User profile icon */}
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
              {user && user.name ? user.name.charAt(0).toUpperCase() : 'V'}
            </div>
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