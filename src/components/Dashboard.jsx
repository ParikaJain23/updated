import React from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ManageAccountsIcon from '@mui/icons-material/ManageAccountsOutlined';
import GridViewIcon from '@mui/icons-material/GridView';
import TuneIcon from '@mui/icons-material/Tune';
import logo from '../../src/assets/image.png';

const Dashboard = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role')?.trim().toUpperCase(); 

  const drawerWidth = 240;
  const navItems = [
    {
      role: 'ADMIN',
      items: [
        { text: 'User Management', icon: <ManageAccountsIcon />, path: '/user-management' },
        { text: 'Onboarding', icon: <GridViewIcon />, path: '/onboarding' },
        { text: 'AWS Services', icon: <TuneIcon />, path: '/aws-dashboard' },
        { text: 'Cost Explorer', icon: <TuneIcon />, path: '/next' }
      ]
    },
    {
      role: 'CUSTOMER',
      items: [
        { text: 'AWS Services', icon: <TuneIcon />, path: '/aws-dashboard' },
        { text: 'Cost Explorer', icon: <TuneIcon />, path: '/next' }
      ]
    },
    {
      role: 'READ_ONLY',
      items: [
        { text: 'User Management', icon: <ManageAccountsIcon />, path: '/user-management' },
        { text: 'Cost Explorer', icon: <TuneIcon />, path: '/next' }
      ]
    }
  ];

  const items = navItems.find((item) => item.role === role)?.items || [];

  const handleLogout = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
  
    try {
      const response = await fetch('http://localhost:8080/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ refreshToken })
      });
  
      if (response.ok) {
        console.log('Logout successful');
      } else {
        console.warn('Logout failed:', await response.text());
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.clear();
      navigate('/login');
    }
  };
  

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: '#fff',
          boxShadow: 1,
          padding: '0 20px'
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <img src={logo} alt="CloudKeeper" style={{ height: '40px' }} />
          <Button variant="contained" color="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {items.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={() => navigate(item.path)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: '#f3f4f6',
          minHeight: '100vh'
        }}
      >
        <Toolbar />
    
        <Typography variant="body1">Role: {role}</Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
