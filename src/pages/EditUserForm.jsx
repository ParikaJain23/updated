import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@mui/material';
import UserForm from '../components/UserForm';

const EditUserForm = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        accountIds: [],
        roleName: ''
    });
    const [roles, setRoles] = useState([]);
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        // Fetch the user data when the component mounts
        const fetchUserData = async () => {
            const response = await fetch(`/api/users/${id}`);
            const data = await response.json();
            setUserData(data);
        };

  
        const fetchRoles = async () => {
            const response = await fetch('/api/roles'); 
            const data = await response.json();
            setRoles(data);
        };

        const fetchAccounts = async () => {
            const response = await fetch('/api/accounts');
            const data = await response.json();
            setAccounts(data);
        };

        fetchUserData();
        fetchRoles();
        fetchAccounts();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

       
        const response = await fetch(`/api/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
          
            navigate('/user-management');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    return (
        <Card sx={{ p: 2, mt: 5 }}>
            <UserForm
                isEdit={true}  // Since this is the edit page
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
