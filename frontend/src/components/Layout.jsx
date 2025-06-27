import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function Layout({ children }) {
  const { signout, user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

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

  // Helper for safe navigation
  const safeNavigate = (to) => {
    if (!to || to === '#' || to === '') {
      alert('No URL available for this link.');
      return;
    }
    navigate(to);
  };

  // Sidebar links config
  const menuLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: (
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6m-6 0H7m6 0v6m0 0H7m6 0h6" /></svg>
    ) },
    { to: '/manage-ipo', label: 'Manage IPO', icon: (
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18v18H3V3zm3 3v12h12V6H6z" /></svg>
    ) },
    { to: '/ipo-information', label: 'IPO Information', icon: (
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>
    ) },
    { to: '/ipo-subscription', label: 'IPO Subscription', icon: (
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8M12 8v8" /></svg>
    ) },
    { to: '/ipo-allotment', label: 'IPO Allotment', icon: (
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M16 3v4M8 3v4" /></svg>
    ) },
  ];
  const otherLinks = [
    { to: '/settings', label: 'Settings', icon: (
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /><circle cx="12" cy="12" r="10" /></svg>
    ) },
    { to: '/api-manager', label: 'API Manager', icon: (
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M16 3v4M8 3v4" /></svg>
    ) },
    { to: '/accounts', label: 'Accounts', icon: (
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 20v-2a4 4 0 014-4h0a4 4 0 014 4v2" /></svg>
    ) },
    { to: '/help', label: 'Help', icon: (
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 16h.01M12 12a4 4 0 10-4-4" /></svg>
    ) },
  ];

  return (
    <div className="flex h-screen bg-[#232323]">
      {/* Sidebar */}
      <div className={`bg-[#F6F7FB] flex flex-col fixed left-0 top-0 z-30 border-r border-gray-100 transition-all duration-300 ${sidebarOpen ? 'w-[240px] h-[960px]' : 'w-0 overflow-hidden'} font-sora`} style={{ minWidth: sidebarOpen ? '240px' : 0, height: sidebarOpen ? '960px' : 0 }}>
        {sidebarOpen ? (
          <>
            <div className="flex items-center justify-start px-4 pt-6 pb-4 w-full" style={{maxWidth: '240px'}}>
              <div className="w-10 h-10 rounded-full bg-[#5B6FFF] flex items-center justify-center mr-2">
                <span className="text-white text-lg font-bold font-sora flex items-center justify-center">BF</span>
              </div>
              <span className="text-base font-bold text-[#5B6FFF] font-sora whitespace-nowrap truncate" style={{maxWidth: '200px'}}>Bluestock Fintech</span>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="px-7 pt-2 pb-2 text-xs font-semibold text-[#B0B3C7] tracking-widest">MENU</div>
              <nav className="mb-8">
                <ul className="space-y-1">
                  {menuLinks.map(link => (
                    <li key={link.to}>
                      <button
                        type="button"
                        onClick={() => safeNavigate(link.to)}
                        className={`flex items-center gap-3 py-2.5 px-5 w-full rounded-xl transition-colors duration-150 text-base font-medium ${location.pathname === link.to ? 'bg-[#E9EDFB] text-[#5B6FFF]' : 'text-[#B0B3C7] hover:bg-[#F0F2FA] hover:text-[#5B6FFF]'}`}
                      >
                        {link.icon}{link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="px-7 pt-2 pb-2 text-xs font-semibold text-[#B0B3C7] tracking-widest">OTHERS</div>
              <nav>
                <ul className="space-y-1">
                  {otherLinks.map(link => (
                    <li key={link.to}>
                      <button
                        type="button"
                        onClick={() => safeNavigate(link.to)}
                        className={`flex items-center gap-3 py-2.5 px-5 w-full rounded-xl transition-colors duration-150 text-base font-medium ${location.pathname === link.to ? 'bg-[#E9EDFB] text-[#5B6FFF]' : 'text-[#B0B3C7] hover:bg-[#F0F2FA] hover:text-[#5B6FFF]'}`}
                      >
                        {link.icon}{link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </>
        ) : null}
      </div>
      {/* Main content */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${!sidebarOpen ? 'ml-0' : 'ml-[240px]'}`}>
        {/* Header */}
        <header className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-20 border-b border-gray-200">
          <div className="flex items-center">
            {/* Hamburger always visible */}
            <button
              className="mr-4 focus:outline-none"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
            >
              <svg className="h-7 w-7 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
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
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout; 