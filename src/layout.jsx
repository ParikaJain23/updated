import * as React from "react";
import { useMemo, useState } from "react";
import {
  Box,
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Tooltip,
  IconButton,
} from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccountsOutlined";
import GridViewIcon from "@mui/icons-material/GridView";
import TuneIcon from "@mui/icons-material/Tune";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import logo from "./assets/image.png";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import axios from "axios";

const drawerWidth = 240;
const collapsedWidth = 60;

export default function ClippedDrawer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [role, setRole] = useState(localStorage.getItem("role") || "GUEST");
  const [firstName, setFirstName] = useState(localStorage.getItem("firstName"));

  const navItems = useMemo(() => {
    const menuItems = {
      ADMIN: [
        {
          text: "User Management",
          icon: <ManageAccountsIcon />,
          path: "/user-management",
        },
        { text: "Onboarding", icon: <GridViewIcon />, path: "/onboarding" },
        { text: "Cost Explorer", icon: <TuneIcon />, path: "/cost-explorer" },
        { text: "AWS Services", icon: <TuneIcon />, path: "/aws-dashboard" },
      ],
      CUSTOMER: [
        { text: "Cost Explorer", icon: <TuneIcon />, path: "/cost-explorer" },
        { text: "AWS Services", icon: <TuneIcon />, path: "/aws-dashboard" },
      ],
      READ_ONLY: [
        {
          text: "User Management",
          icon: <ManageAccountsIcon />,
          path: "/user-management",
        },
        { text: "Dashboard", icon: <GridViewIcon />, path: "/dashboard" },
        { text: "AWS Services", icon: <TuneIcon />, path: "/aws-dashboard" },
      ],
    };
    return menuItems[role] || [];
  }, [role]);

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (accessToken && refreshToken) {
        await axios.post(
          "http://localhost:8080/api/auth/logout",
          { refreshToken },
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
      }

      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#fff",
          boxShadow: 1,
          padding: "0 20px",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton onClick={() => setCollapsed(!collapsed)} size="small">
              {collapsed ? <MenuIcon /> : <ChevronLeftIcon />}
            </IconButton>
            <img src={logo} alt="CloudKeeper" className="h-8" />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Tooltip
              title={
                <Box>
                  <Typography variant="body2">
                    <strong>Role:</strong> {role}
                  </Typography>
                </Box>
              }
              arrow
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mr: 2,
                  cursor: "default",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, color: "#333", mr: 0.5 }}
                >
                  Welcome,
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 400, color: "#555" }}
                >
                  {firstName}
                </Typography>
              </Box>
            </Tooltip>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogout}
              sx={{ textTransform: "none" }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: collapsed ? collapsedWidth : drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: collapsed ? collapsedWidth : drawerWidth,
            boxSizing: "border-box",
            transition: "width 0.3s",
            overflowX: "hidden",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  selected={location.pathname === item.path}
                  sx={{
                    minHeight: 48,
                    justifyContent: collapsed ? "center" : "initial",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: collapsed ? "auto" : 3,
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {!collapsed && <ListItemText primary={item.text} />}
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
          backgroundColor: "#f3f4f6",
          transition: "margin-left 0.3s",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
