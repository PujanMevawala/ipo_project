import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_REACT_GOOGLE_CLIENT_ID || "134810972176-83pho3nccmier1bmvn1snj13q2on8pg1.apps.googleusercontent.com"}>
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    </GoogleOAuthProvider>
  </StrictMode>,
)
