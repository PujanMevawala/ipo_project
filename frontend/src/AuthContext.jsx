import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("AuthContext: useEffect running");
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    console.log("AuthContext: Stored Token on load:", storedToken);
    console.log("AuthContext: Stored User on load:", storedUser);

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log("AuthContext: User set from localStorage:", parsedUser);
      } catch (error) {
        console.error("AuthContext: Failed to parse stored user data:", error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
    console.log("AuthContext: Loading set to false after initial check.");
  }, []);

  const signin = async (email, password) => {
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
        localStorage.setItem('token', data.token); // Store the token
        localStorage.setItem('user', JSON.stringify(data.user)); // Store user data
        console.log("AuthContext: User signed in and stored in localStorage:", data.user);
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
  };

  const signup = async(name, email, password) =>
  {
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
  };

  const forgotPassword = (email) => {
    // Simulate forgot password success
    console.log('Password reset requested for:', email);
    alert('Password reset link sent to your email (simulated).');
    navigate('/signin');
    return true;
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem('token'); // Clear token on signout
    localStorage.removeItem('user'); // Clear user data on signout
    console.log("AuthContext: User signed out. localStorage cleared.");
    navigate('/signin');
  };

  return (
    <AuthContext.Provider value={{ user, signin, signup, forgotPassword, signout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 