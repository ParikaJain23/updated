import * as React from "react";
import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ManageAccountsIcon from "@mui/icons-material/ManageAccountsOutlined";
import GridViewIcon from "@mui/icons-material/GridView";
import TuneIcon from "@mui/icons-material/Tune";
import logo from "./assets/image.png";
import { Button, Tooltip } from "@mui/material";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import axios from "axios";

const drawerWidth = 240;

export default function ClippedDrawer() {
  const navigate = useNavigate();
  const location = useLocation();
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
          <img src={logo} alt="CloudKeeper" className="h-8" />
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
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
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
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, backgroundColor: "#f3f4f6" }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
