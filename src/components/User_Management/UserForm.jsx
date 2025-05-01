import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Paper,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UserForm = ({ isEdit, formData, onChange, onSubmit, roles, accounts }) => {
  const [selectedAccounts, setSelectedAccounts] = useState([]);

  useEffect(() => {
    if (Array.isArray(formData.accountIds) && formData.accountIds.length > 0 && accounts.length > 0) {
      const initialSelected = accounts.filter(acc =>
        formData.accountIds.includes(acc.accountId)
      );
      setSelectedAccounts(initialSelected);
    }
  }, [formData.accountIds, accounts]);

  useEffect(() => {
    const ids = selectedAccounts.map(acc => acc.accountId);
    const areEqual = JSON.stringify(ids.sort()) === JSON.stringify(formData.accountIds.sort());
    if (!areEqual) {
      onChange({ target: { name: 'accountIds', value: ids } });
    }
  }, [selectedAccounts]);

  const handleAddAccount = (account) => {
    if (!selectedAccounts.some(acc => acc.accountId === String(account.accountId))) {
      setSelectedAccounts([...selectedAccounts, { ...account, accountId: String(account.accountId) }]);
    }
  };

  const handleRemoveAccount = (account) => {
    setSelectedAccounts(selectedAccounts.filter(acc => acc.accountId !== String(account.accountId)));
  };

  const availableAccounts = accounts.filter(
    acc => !selectedAccounts.some(selected => selected.accountId === acc.accountId)
  );

  return (
    <Paper elevation={3} sx={{ maxWidth: 800, mx: 'auto', my: 4, p: 4, borderRadius: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
        {isEdit ? 'Edit User' : 'Add New User'}
      </Typography>

      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={onChange}
              fullWidth
              required
              variant="outlined"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={onChange}
              fullWidth
              required
              variant="outlined"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={onChange}
              fullWidth
              required
              type="email"
              variant="outlined"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              name="password"
              value={formData.password}
              onChange={onChange}
              fullWidth
              required={!isEdit}
              type="password"
              variant="outlined"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
  <TextField
    select
    label=""
    name="roleId"
    value={formData.roleId}
    onChange={onChange}
    fullWidth
    required
    variant="outlined"
    SelectProps={{
      displayEmpty: true,
      MenuProps: {
        PaperProps: {
          style: {
            maxHeight: 300,
          },
        },
      },
    }}
    sx={{ mb: 2 }}
  >
    <MenuItem value="" disabled>
      Select a role
    </MenuItem>
    {roles.map((role) => (
      <MenuItem key={role.id} value={role.id}>
        {role.name}
      </MenuItem>
    ))}
  </TextField>
</Grid>


          {(formData.roleId === 3 || formData.roleId === '3') && (
            <Grid item xs={12}>
              <Box sx={{ border: '1px solid #ddd', borderRadius: 2, p: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Select Accounts for Customer
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={5}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
                      Available Accounts
                    </Typography>
                    <List sx={{ border: '1px solid #eee', borderRadius: 1, height: 250, overflowY: 'auto' }}>
                      {availableAccounts.length > 0 ? (
                        availableAccounts.map((acc) => (
                          <ListItem key={acc.accountId} secondaryAction={
                            <IconButton onClick={() => handleAddAccount(acc)}>
                              <ArrowForwardIcon />
                            </IconButton>
                          }>
                            <ListItemText primary={`${acc.accountName} (${acc.accountId})`} />
                          </ListItem>
                        ))
                      ) : (
                        <ListItem>
                          <ListItemText primary="No available accounts" />
                        </ListItem>
                      )}
                    </List>
                  </Grid>

                  <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Divider orientation="vertical" flexItem sx={{ height: '80%' }} />
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
                      Selected Accounts
                    </Typography>
                    <List sx={{ border: '1px solid #eee', borderRadius: 1, height: 250, overflowY: 'auto' }}>
                      {selectedAccounts.length > 0 ? (
                        selectedAccounts.map((acc) => (
                          <ListItem key={acc.accountId} secondaryAction={
                            <IconButton onClick={() => handleRemoveAccount(acc)}>
                              <ArrowBackIcon />
                            </IconButton>
                          }>
                            <ListItemText primary={`${acc.accountName} (${acc.accountId})`} />
                          </ListItem>
                        ))
                      ) : (
                        <ListItem>
                          <ListItemText primary="No accounts selected" />
                        </ListItem>
                      )}
                    </List>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          )}

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" size="large" fullWidth>
              {isEdit ? 'Update User' : 'Add User'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default UserForm;
