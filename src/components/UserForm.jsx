import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, MenuItem, Box, Typography, List, ListItem, ListItemText, IconButton, Divider } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UserForm = ({ isEdit, formData, onChange, onSubmit, roles, accounts, handleChange }) => {
  const [selectedAccounts, setSelectedAccounts] = useState([]);

  useEffect(() => {
    if (Array.isArray(formData.accountIds) && formData.accountIds.length > 0) {
      const initialSelected = accounts.filter(acc =>
        formData.accountIds.includes(acc.accountId)
      );
      setSelectedAccounts(initialSelected);
    }
  }, [formData.accountIds, accounts]);

  useEffect(() => {
  const ids = selectedAccounts.map(acc => acc.accountId);
  const areEqual = JSON.stringify(ids) === JSON.stringify(formData.accountIds);
  if (!areEqual) {
    console.log('Syncing Account IDs:', ids);
    onChange({ target: { name: 'accountIds', value: ids } });
  }
}, [selectedAccounts]);


  const handleAddAccount = (account) => {
    if (!selectedAccounts.some(acc => acc.accountId === account.accountId)) {
      const newSelectedAccounts = [...selectedAccounts, account];
      setSelectedAccounts(newSelectedAccounts);
      console.log('Updated Selected Accounts (Add):', newSelectedAccounts);
    }
  };

  const handleRemoveAccount = (account) => {
    const newSelectedAccounts = selectedAccounts.filter(acc => acc.accountId !== account.accountId);
    setSelectedAccounts(newSelectedAccounts);
    console.log('Updated Selected Accounts (Remove):', newSelectedAccounts);
  };
  
  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid size={6} sm={12}>
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
            fullWidth
            required
          />
        </Grid>
        <Grid size={6} sm={12}>
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
            fullWidth
            required
          />
        </Grid>
        <Grid size={6} sm={12}>
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={onChange}
            fullWidth
            required
            type="email"
          />
        </Grid>
        <Grid size={6} sm={12}>
          <TextField
            label="Password"
            name="password"
            value={formData.password}
            onChange={onChange}
            fullWidth
            required
            type="password"
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label="Role"
            name="roleId"
            select
            value={formData.roleId}
            onChange={onChange}
            fullWidth
            required
          >
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Customer Role Account Selection */}
        {formData.roleId === 3 && (
          <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2, mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>Select Accounts for Customer</Typography>
            <Grid container spacing={2}>
              <Grid size={5}>
                <Typography variant="body2">Available Accounts</Typography>
                <List dense sx={{ border: '1px solid #ccc', borderRadius: 1, height: 250, overflowY: 'auto' }}>
                  {accounts.map((acc) => (
                    <ListItem key={acc.accountId} dense>
                      <ListItemText primary={`${acc.accountName} (${acc.accountId})`} />
                      <IconButton edge="end" onClick={() => handleAddAccount(acc)}>
                        <ArrowForwardIcon />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              </Grid>

              <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Divider orientation="vertical" flexItem />
              </Grid>

              <Grid item xs={5}>
                <Typography variant="body2">Selected Accounts</Typography>
                <List dense sx={{ border: '1px solid #ccc', borderRadius: 1, height: 250, overflowY: 'auto' }}>
                  {selectedAccounts.map((acc) => (
                    <ListItem key={acc.accountId} dense>
                      <ListItemText primary={`${acc.accountName} (${acc.accountId})`} />
                      <IconButton edge="end" onClick={() => handleRemoveAccount(acc)}>
                        <ArrowBackIcon />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Box>
        )}

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {isEdit ? 'Update User' : 'Add User'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserForm;
