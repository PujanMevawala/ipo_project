import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import ManageIPO from './pages/ManageIPO';
import IPOInformation from './pages/IPOInformation';
import PrivateRoute from './PrivateRoute';
import UpcomingIPO from './pages/UpcomingIPO';

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
      <Route path="*" element={<Navigate to="/up" replace />} />
    </Routes>
  );
}

export default App;
