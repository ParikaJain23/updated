import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import img from "../assets/image.png"; // Image is used in the JSX below
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState(""); // Email is used in the form input
  const [password, setPassword] = useState(""); // Password is used in the form input
  const navigate = useNavigate();

  const redirectToDashboard = React.useCallback((role) => {
    switch (role) {
      case "ADMIN":
        navigate("/user-management");
        break;
      case "CUSTOMER":
        navigate("/cost-explorer");
        break;
      case "READ_ONLY":
        navigate("/user-management");
        break;
      default:
        navigate("/not-authorized");
    }
  }, [navigate]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const role = localStorage.getItem("role");

    if (isAuthenticated && role) {
      redirectToDashboard(role);
    }
  }, [redirectToDashboard]);

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim() || !password.trim()) {
      toast.error("All fields are required", { autoClose: 1000 });
      return false;
    }

    if (!emailRegex.test(email)) {
      toast.error("Invalid email format", { autoClose: 1000 });
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters", {
        autoClose: 1000,
      });
      return false;
    }
    

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { accessToken, refreshToken, role, firstName, lastName } = response.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("role", role);
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("lastName", lastName);
        localStorage.setItem("isAuthenticated", "true");
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        toast.success("Login successful!", {
          autoClose: 1000,
          onClose: () => redirectToDashboard(role),
        });
      }
    } catch (err) {
      toast.error("Login failed!", {
        autoClose: 1000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <img src={img} alt="CloudBalance Logo" className="h-12" />
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;