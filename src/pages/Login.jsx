


import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import img from "../assets/image.png"; 
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/actions/ authActions";
import loginFormConfig from "../config/formConfig"; 
import Form from "../components/FormConfig";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const redirectToDashboard = useCallback((role) => {
    switch (role) {
      case "ADMIN":
      case "READ_ONLY":
        navigate("/user-management");
        break;
      case "CUSTOMER":
        navigate("/cost-explorer");
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

  const handleChange = (e, values) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/auth/login", formData);
      if (response.status === 200) {
        const { accessToken, refreshToken, role , id} = response.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("role", role);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userId", id); 

        dispatch(loginSuccess(response.data));
        toast.success("Login successful!", { autoClose: 1000 });
        redirectToDashboard(role);
      }
    } catch (err) {
      toast.error("Login failed!", { autoClose: 1000 });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <img src={img} alt="CloudBalance Logo" className="h-12" />
        </div>
        <Form
          config={loginFormConfig}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          intialValues={formData}
        />
      </div>
    </div>
  );
};

export default Login;
