import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, data } from 'react-router-dom';
import { Card, CircularProgress, Box, Typography } from '@mui/material';
import UserForm from '../components/User_Management/UserForm';
import axios from 'axios';

const EditUserForm = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        accountIds: [],
        roleId: ''
    });
    const [roles, setRoles] = useState([
        { id: 1, name: 'ADMIN' },
        { id: 2, name: 'READ_ONLY' },
        { id: 3, name: 'CUSTOMER' }
    ]);
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    throw new Error('No authentication token found');
                }

                const accountsResponse = await fetch('http://localhost:8080/api/accounts', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                
                if (!accountsResponse.ok) {
                    throw new Error('Failed to fetch accounts');
                }
                
                const accountsData = await accountsResponse.json();
                const fetchedAccounts = accountsData.data || [];
                setAccounts(fetchedAccounts);
                
                const userResponse = await fetch(`http://localhost:8080/api/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                
                if (!userResponse.ok) {
                    throw new Error('Failed to fetch user data');
                }
                
                const userData = await userResponse.json();
                
                if (!userData || !userData.data) {
                    throw new Error('Invalid user data received');
                }
                
                const userRole = roles.find(role => role.name === userData.data.roleName)?.id;
                
                const accountIds = Array.isArray(userData.data.accountIds) 
                    ? userData.data.accountIds 
                    : [];
                
                console.log('User Data:', userData.data);
                console.log('Account IDs:', accountIds);
                
                setUserData({
                    ...userData.data,
                    roleId: userRole,
                    accountIds: accountIds,
                    password: '' 
                });
                
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, roles]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const token = localStorage.getItem('accessToken');
            debugger;
            if (!token) {
                throw new Error('No authentication token found');
            }
            
            const dataToSubmit = {...userData};
            delete dataToSubmit.roleName;
            delete dataToSubmit.lastLogin;
            if (!dataToSubmit.password) {
                delete dataToSubmit.password;
            }
            
            console.log('Submitting user data:', dataToSubmit);
            debugger;
            const response = await axios.put(
                `http://localhost:8080/api/users/${id}`,
                dataToSubmit,
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
            
            navigate('/user-management');
        } catch (err) {
            console.error('Error updating user:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
        
        console.log(`Field ${name} changed to:`, value);
    };

    if (loading && !userData.firstName) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ mt: 5, p: 2, bgcolor: '#ffebee', borderRadius: 1 }}>
                <Typography color="error">Error: {error}</Typography>
            </Box>
        );
    }

    return (
        <Card sx={{ p: 2, mt: 5 }}>
            <Typography variant="h5" gutterBottom>Edit User</Typography>
            <UserForm
                isEdit={true}
                formData={userData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                roles={roles}
                accounts={accounts}
                
            />
        </Card>
    );
};

export default EditUserForm;