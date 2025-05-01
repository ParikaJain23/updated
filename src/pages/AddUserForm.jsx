

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import axiosInstance from '../api/axiosInstance';
import UserForm from '../components/User_Management/UserForm';
import addUserFormConfig from '../config/addUserFormConfig'; 

const AddUserForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    roleId: '',
    accountIds: [],
  });

  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);

  const roles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Read_Only' },
    { id: 3, name: 'Customer' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Field ${name} changed to:`, value);
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      const payload = {
        ...formData,
        accountIds: formData.accountIds.map(id => String(id)),
      };

      if (!token) {
        toast.error("Access token is missing. Please log in again.");
        return;
      }

      console.log("Submitting user data:", payload);

      const res = await axios.post('http://localhost:8080/api/users', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log("User added successfully:", res);
      toast.success("User added successfully!");
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        roleId: '',
        accountIds: [],
      });
      navigate('/user-management');
    } catch (error) {
      console.error("Error adding user:", error);
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized. Please check your access token.");
      } else if (error.response && error.response.data) {
        toast.error(`Failed to add user: ${error.response.data.message || "Unknown error"}`);
      } else {
        toast.error("Failed to add user. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchAccounts = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      toast.error("No token found. Please log in.");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.get('/accounts');
      if (response.data && Array.isArray(response.data.data)) {
        setAccounts(response.data.data.map(acc => ({ ...acc, accountId: String(acc.accountId) })));
      } else {
        toast.warning("No accounts found.");
      }
    } catch (error) {
      toast.error('Failed to load accounts');
      console.error("Error fetching accounts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <Card sx={{ maxWidth: 900, mx: 'auto', p: 4, my: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Add New User</Typography>
      <UserForm
        isEdit={false}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        formConfig={addUserFormConfig}   
        roles={roles}
        accounts={accounts}
        loading={loading}
      />
    </Card>
  );
};

export default AddUserForm;
