import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(name, email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create an account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3 relative">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
            {password && (
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center pt-6 text-gray-600 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </span>
            )}
          </div>
          <p className="text-gray-600 text-xs mb-4">By continuing, you agree to our <a href="#" className="text-blue-500 hover:underline">terms of service</a>.</p>
          {/* reCAPTCHA checkbox */}
          <div className="mb-4 flex items-center justify-between border border-gray-300 p-2 rounded-md">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="not-robot-signup"
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <label htmlFor="not-robot-signup" className="ml-2 text-gray-700 text-sm">I'm not a robot</label>
            </div>
            <div className="w-15 h-15  flex items-center justify-center text-xs text-gray-600 rounded-sm">
              <img src="/recaptcha.png" alt="reCAPTCHA icon" className="w-14 h-10" />
            </div>
          </div>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Sign up
          </button>
          <div className="text-center my-4 text-gray-500 text-sm">
            or sign up with
          </div>
          <button
            type="button"
            className="w-full bg-gray-200 hover:bg-gray-300 border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
          >
            <img src="/google-icon.svg" alt="Google icon" className="w-5 h-5 mr-2" />
            Continue with Google
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">Already have an account? <Link to="/signin" className="text-blue-500 hover:text-blue-800 font-bold text-sm">Sign in here</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Signup; 