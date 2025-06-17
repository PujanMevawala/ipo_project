import React, { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error("AuthContext: Failed to parse stored user data:", error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const signin = useCallback(async (email, password) => {
    try {
      const response = await fetch('http://localhost:5001/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user); 
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard');
        return true;
      } else {
        console.error('Login error:', data.message);
        alert(data.message || 'Invalid credentials');
        return false;
      }
    } catch (error) {
      console.error('Network error during login:', error);
      alert('Network error. Please try again later.');
      return false;
    }
  }, [navigate]);

  const signup = useCallback(async(name, email, password) => {
    try {
        const response = await fetch('http://localhost:5001/signup', 
            {
                method: 'POST',
                headers: 
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name, email, password}),
            });

            const data = await response.json();
            if(response.ok)
            {
                console.log('User registered successfully', data);
                alert('Registration successfull! Login now to access the dashboard');
                navigate('/signin');
                return true;
            }
            else
            {
                console.error(' Signup error frontend', data.message);
                alert(`Signup failed: ${data.message || 'Unknown error'}`);
                return false;
            }
    } catch (error) {
        console.error('Network error', error);
        alert('Network error. Please try again later.');
        return false;
    }
  }, [navigate]);

  const testBackendConnection = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5001/test');
      const data = await response.json();
      console.log('Backend test response:', data);
      return true;
    } catch (error) {
      console.error('Backend connection test failed:', error);
      return false;
    }
  }, []);

  const googleSignin = useGoogleLogin({
    onSuccess: useCallback(async (tokenResponse) => {
      try {
        console.log('Google login success, token response:', tokenResponse);
        
        // Get the ID token from Google
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch user info: ${response.status}`);
        }
        
        const userInfo = await response.json();
        console.log('Google user info:', userInfo);
        
        // Send the access token to our backend
        const backendResponse = await fetch('http://localhost:5001/google-signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            token: tokenResponse.access_token,
            userInfo: userInfo 
          }),
        });

        const data = await backendResponse.json();
        console.log('Backend response:', data);

        if (backendResponse.ok) {
          setUser(data.user);
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          console.log("AuthContext: Google signin successful:", data.user);
          navigate('/dashboard');
        } else {
          console.error('Google signin error:', data.message);
          alert(data.message || 'Google signin failed');
        }
      } catch (error) {
        console.error('Network error during Google signin:', error);
        alert(`Network error during Google signin: ${error.message}`);
      }
    }, [navigate]),
    onError: useCallback((error) => {
      console.error('Google login error:', error);
      alert('Google signin failed. Please try again.');
    }, []),
    flow: 'implicit'
  });

  const forgotPassword = useCallback((email) => {
    // Simulate forgot password success
    console.log('Password reset requested for:', email);
    alert('Password reset link sent to your email (simulated).');
    navigate('/signin');
    return true;
  }, [navigate]);

  const signout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (process.env.NODE_ENV === 'development') {
      console.log("AuthContext: User signed out. localStorage cleared.");
    }
    navigate('/up');
  }, [navigate]);

  const contextValue = useMemo(() => ({
    user,
    signin,
    signup,
    googleSignin,
    testBackendConnection,
    forgotPassword,
    signout,
    loading
  }), [user, signin, signup, googleSignin, testBackendConnection, forgotPassword, signout, loading]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 