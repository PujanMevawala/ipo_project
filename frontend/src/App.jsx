import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './index.css';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import ManageIPO from './pages/ManageIPO';
import IPOInformation from './pages/IPOInformation';
import PrivateRoute from './PrivateRoute';
import UpcomingIPO from './pages/UpcomingIPO';

function NoMatch() {
  React.useEffect(() => {
    alert('No page available for this link.');
    // Do not navigate away
  }, []);
  // Optionally, render nothing or a message
  return null;
}

function App() {
  return (
    <Routes>
      <Route path='/up' element={<UpcomingIPO />}/>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/manage-ipo"
        element={
          <PrivateRoute>
            <ManageIPO />
          </PrivateRoute>
        }
      />
      <Route
        path="/ipo-information"
        element={
          <PrivateRoute>
            <IPOInformation />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

export default App;
