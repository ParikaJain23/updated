import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from '../components/UserForm';
import { Card, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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
      const payload = { ...formData };

      if (!token) {
        toast.error("Access token is missing. Please log in again.");
        return;
      }

      console.log("Submitting user data:", payload);

      await axios.post('http://localhost:8080/api/users', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

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
      const response = await axios.get('http://localhost:8080/api/accounts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      console.log("Raw API response:", response.data);
      if (response.data && Array.isArray(response.data.data)) {
        console.log("Extracted accounts:", response.data.data);
        setAccounts(response.data.data);
      } else if (Array.isArray(response.data)) {
        console.log("Direct accounts array:", response.data);
        setAccounts(response.data);
      } else {
        console.error("Could not find accounts array in response:", response.data);
        setAccounts([]);
        toast.warning("Could not retrieve accounts data");
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
      if (error.response && error.response.status === 401) {
        toast.error('Unauthorized to access accounts.');
      } else {
        toast.error('Failed to load accounts');
      }
      setAccounts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (formData.roleId === 3 || formData.roleId === '3') {
      fetchAccounts();
    } else {
      setAccounts([]);
    }
  }, [formData.roleId]);

  return (
    <Card sx={{ p: 2, mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Add New User
      </Typography>
      
      {loading && <Typography>Loading...</Typography>}
      
      <UserForm
        isEdit={false}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        roles={roles}
        accounts={accounts}
      />
    </Card>
  );
};

export default AddUserForm;