import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import StickyHeadTable from '../components/Table';
import { Button, CardContent } from '@mui/material';
import CustomSeparator from '../components/Breadcrumb';
import AddUserForm from './AddUserForm';
import { Outlet, useNavigate } from 'react-router-dom';


const columns = [
  { id: 'firstName', label: 'First Name', minWidth: 150 },
  { id: 'lastName', label: 'Last Name', minWidth: 150 },
  { id: 'email', label: 'Email', minWidth: 200 },
  { id: 'roleName', label: 'Role', minWidth: 100 },
  { id: 'lastLogin', label: 'Last Login', minWidth: 150 },
  { id: 'action', label: 'Action', minWidth: 100 },
];


export const UserTable = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedDashboard, setSelectedDashboard] = useState("userTable");


  const role = localStorage.getItem('role');
  const token = localStorage.getItem('accessToken');

 
  useEffect(() => {
    // if(selectedDashboard === "userTable" && role === "ADMIN" || role === "READ_ONLY"){
    
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        console.log('Access Token:', token); 
        const response = await axios.get('http://localhost:8080/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        console.log('Fetched Users Response:', response.data.data);
  
        const userData = response.data.data.map(user => ({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          roleName: user.roleName || 'N/A',
          lastLogin: user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'N/A',
          action: user.id
        }));
  
        setRows(userData);
      } catch (error) {
        console.error(' Failed to fetch users:', error);
  
        if (error.response) {
          console.error(' Backend Response Error:', error.response.data);
          console.error(' Status Code:', error.response.status);
          console.error(' Headers:', error.response.headers);
        } else if (error.request) {
          console.error(' No Response Received:', error.request);
        } else {
          console.error(' Error Setting Up Request:', error.message);
        }
      }
    };

  
  
    fetchUsers();

  }, []);
  
  
  const handleAddUser = () => {
    setShowAddForm(true);
  };

  const handleBackToTable = () => {
    setShowAddForm(false);
  };

  const breadcrumbItems = showAddForm
    ? [
        { label: 'Users', href: '/', onClick: handleBackToTable },
        { label: 'Add User' },
      ]
    : [{ label: 'Users', href: '/' }];
    if(selectedDashboard === "userTable" && role === "ADMIN" || role === "READ_ONLY"){
  return (
    <>
      <CustomSeparator items={breadcrumbItems} />

      {showAddForm ? (
        <AddUserForm onCancel={handleBackToTable} />
      ) : (
        <Card sx={{ p: 2, mt: 5 }}>
          <CardContent
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pb: 0,
              mb: 2,
            }}
          >
            <Button variant="contained" onClick={() => navigate('add-user')}>
              + Add New User
            </Button>
          </CardContent>
          <StickyHeadTable columns={columns} rows={rows} />
          <Outlet/>
        </Card>
      )}
    </>
  );
}
};

export default UserTable;