import * as React from 'react';
import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import logo from './assets/image.png';
import { Button } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccountsOutlined';
import GridViewIcon from '@mui/icons-material/GridView'; 
import TuneIcon from '@mui/icons-material/Tune'; 
import { UserTable } from './pages/UserTable';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import axios from 'axios';
const drawerWidth = 240;

export default function ClippedDrawer() {

    const navigate = useNavigate();
    const location = useLocation();


    // const navItems = [
    //     { text: 'User Management', icon: <ManageAccountsIcon />, path: '/user-management' },
    //     { text: 'Onboarding', icon: <GridViewIcon />, path: '/onboarding' },
    //     { text: 'AWS Services', icon: <TuneIcon />, path: '/aws-services' },
    //     { text: 'Cost Explorer', icon: <TuneIcon />, path: '/cost-explorer' }
    //   ];

      const navItems = useMemo(() => {
        const menuItems = {
            "ADMIN" :[
                { text: 'User Management', icon: <ManageAccountsIcon />, path: '/user-management' },
                { text: 'Onboarding', icon: <GridViewIcon />, path: '/onboarding' },
                { text: 'AWS Services', icon: <TuneIcon />, path: '/aws-services' },
                { text: 'Cost Explorer', icon: <TuneIcon />, path: '/cost-explorer' }
            ],
            "CUSTOMER" : [
                { text: 'AWS Services', icon: <TuneIcon />, path: '/aws-services' },
                { text: 'Cost Explorer', icon: <TuneIcon />, path: '/cost-explorer' }
            ]
        };
        return menuItems[localStorage.getItem('role')] || [];
      },[localStorage.getItem('role')]);
      const handleLogout = async () => {
        try {
            // Get the access and refresh tokens from localStorage
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            const role = localStorage.getItem('role'); 
    
            // If tokens are present, call the backend to invalidate them
            if (accessToken && refreshToken) {
                // Send logout request to backend
                await axios.post(
                    'http://localhost:8080/api/auth/logout', // Replace with your API URL
                    { refreshToken }, 
                    { headers: { Authorization: `Bearer ${accessToken}` } }
                );
            }
    
            // Clear localStorage (access token, refresh token, and role)
            localStorage.clear();
            // Redirect to login page
            navigate('/login');
        } catch (error) {
            console.error('Error during logout', error);
            // Optionally show a toast notification or alert
        }
    };

  return (
    <Box sx={{ display: 'flex' ,minHeight:"100vh"}}>
      <CssBaseline />
      <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backgroundColor: '#fff',
                    boxShadow: 1,
                    padding: '0 20px',
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <img src={logo} alt="CloudKeeper" className="h-8" />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body1" sx={{ marginRight: 2 }}>
                          
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleLogout}
                            sx={{ textTransform: 'none' }}
                        >
                            Logout
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
        <List>
            {navItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  selected={location.pathname === item.path}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
                </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 , backgroundColor: '#f3f4f6'}}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}