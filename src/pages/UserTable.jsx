import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Card, CardContent } from "@mui/material";
import CustomSeparator from "../components/User_Management/Breadcrumb";
import AddUserForm from "./AddUserForm";
import { Outlet, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import axiosInstance from "../api/axiosInstance";

export const UserTable = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [selectedDashboard, setSelectedDashboard] = useState("userTable");

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/users");

        const userData = response.data.data.map((user) => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          roleName: user.roleName || "N/A",
          lastLogin: user.lastLogin
            ? new Date(user.lastLogin).toLocaleString()
            : "N/A",
        }));

        setRows(userData);
      } catch (error) {
        console.error("Failed to fetch users:", error);

        if (error.response) {
          console.error("Backend Response Error:", error.response.data);
          console.error("Status Code:", error.response.status);
          console.error("Headers:", error.response.headers);
        } else if (error.request) {
          console.error("No Response Received:", error.request);
        } else {
          console.error("Error Setting Up Request:", error.message);
        }
      }
    };

    fetchUsers();
  }, [token]);

  const handleBackToTable = () => {
    setShowAddForm(false);
  };

  const handleEditUser = (userId) => {
    navigate(`/user-management/edit-user/${userId}`);
  };

  const breadcrumbItems = showAddForm
    ? [
        {
          label: "Users",
          href: "/",
          onClick: handleBackToTable,
          style: {
            fontSize: "53px",
            fontWeight: "900",
            color: "#1f2937",
          },
        },
        { label: "Add User", style: { fontSize: "1.25rem", fontWeight: "700" } },
      ]
    : [
        {
          label: "Users",
          href: "/",
          style: {
            fontSize: "33px",
            fontWeight: "900",
            color: "#1f2937",
          },
        },
      ];

  const columns = [
    { field: "firstName", headerName: "First Name", width: 280 },
    { field: "lastName", headerName: "Last Name", width: 280 },
    { field: "email", headerName: "Email", width: 280 },
    { field: "roleName", headerName: "Role", width: 280 },
    { field: "lastLogin", headerName: "Last Login", width: 280 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <Button 
          color="primary" 
          size="small"
          onClick={() => handleEditUser(params.row.id)}
        >
          <EditIcon />
        </Button>
      ),
    },
  ];

  if (
    selectedDashboard === "userTable" &&
    (role === "ADMIN" || role === "READ_ONLY")
  ) {
    return (
      <>
        <CustomSeparator items={breadcrumbItems} />

        {showAddForm ? (
          <AddUserForm onCancel={handleBackToTable} />
        ) : (
          <Card sx={{ p: 2, mt: 5 }}>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                pb: 0,
                mb: 2,
              }}
            >
              {role !== "READ_ONLY" && (
                <Button variant="contained" onClick={() => navigate("add-user")}>
                  + Add New User
                </Button>
              )}
            </CardContent>
            <div style={{ height: "100%", width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pagination
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[10, 20, 50]}
                disableRowSelectionOnClick
              />
            </div>
            <Outlet />
          </Card>
        )}
      </>
    );
  }
};

export default UserTable;