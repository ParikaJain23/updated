// src/components/NotFound.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [countdown, setCountdown] = useState(5);

  const getRedirectPath = () => {
    const role = localStorage.getItem('role');
    switch (role) {
      case 'ADMIN':
      case 'READ_ONLY':
        return '/user-management';
      case 'CUSTOMER':
        return '/aws-dashboard';
      default:
        return '/login';
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          navigate(location.state?.from || getRedirectPath());
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, location]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-100 to-pink-200 text-gray-800">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-2">Oops! The page you're looking for doesn't exist.</p>
      <p className="text-lg mb-6">
        Redirecting you back in <span className="font-semibold">{countdown}</span> seconds...
      </p>
      <button
        onClick={() => navigate(location.state?.from || getRedirectPath())}
        className="px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300"
      >
        Go Back Now
      </button>
    </div>
  );
};

export default NotFound;
