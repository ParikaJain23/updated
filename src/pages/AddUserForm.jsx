import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from '../components/UserForm';
import { Card } from '@mui/material';
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

  const roles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Read_Only' },
    { id: 3, name: 'Customer' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      const payload = { ...formData, accountIds: formData.accountIds }; // Ensure accountIds are included

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
      toast.error("Failed to add user. Please try again.");
    }
  };

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    if (formData.roleId === '3' || formData.roleId === 3) {
      axios
        .get('http://localhost:8080/api/accounts', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setAccounts(res.data)) 
        .catch((err) => toast.error('Failed to load accounts'));
    } else {
      setAccounts([]);
    }
  }, [formData.roleId, token]);

  return (
    <Card sx={{ p: 2, mt: 5 }}>
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
