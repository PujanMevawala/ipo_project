import React, { memo } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = memo(({ children }) => {
  const { user, loading } = useAuth();

  // Only log once during development
  if (process.env.NODE_ENV === 'development') {
    console.log("PrivateRoute: checking authentication - user:", user ? 'authenticated' : 'not authenticated', "loading:", loading);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
            <span className="text-gray-700">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
});

PrivateRoute.displayName = 'PrivateRoute';

export default PrivateRoute; 