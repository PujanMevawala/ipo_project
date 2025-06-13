import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  console.log("PrivateRoute: rendering, user:", user, "loading:", loading);

  if (loading) {
    console.log("PrivateRoute: still loading authentication state.");
    return <div>Loading...</div>; // Or a more sophisticated loading spinner
  }

  if (!user) {
    console.log("PrivateRoute: user is NOT authenticated, redirecting to /signin.");
    // User not authenticated, redirect to signin page
    return <Navigate to="/signin" replace />;
  }

  console.log("PrivateRoute: user IS authenticated, rendering children.");
  return children;
};

export default PrivateRoute; 