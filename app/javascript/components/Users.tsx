import * as React from 'react';

import { Box, Grid, Button } from '@mui/material';

import CreateForm from './Users/form/CreateForm';
import UsersTable from './Users/table/Table';
import { UserData } from '../mixins/initialValues/userList';
import { userFormValues } from '../initialValues/userInitialValues';
import httpClient from '../api/httpClient';

const Users = ({ companiesJSON, rolesJSON }) => {
  const [createModal, setCreateModalActive] = React.useState(false);
  const [updateModal, setUpdateModalActive] = React.useState(false);
  const [users, setUser] = React.useState<UserData[]>(null);
  const [editUserModal, setEditUserModal] = React.useState(null);
  const [formErrors, setFormErrors] = React.useState([]);
  const [companies, setCompanies] = React.useState(JSON.parse(companiesJSON));
  const [roles, setRoles] = React.useState(JSON.parse(rolesJSON));

  const handleClose = () => {
    setCreateModalActive(false);
    setUpdateModalActive(false);
    setEditUserModal(null);
    setFormErrors(null);
  };

  const handleSubmit = (user: userFormValues) => {
    httpClient.users.create(user)
      .then((response) => {
        setUser((prevUsers) => [...prevUsers, response.data]);
      });
    handleClose();
  };

  const handleEditSubmit = (user: userFormValues) => {
    httpClient.users.update(user.id, user)
      .then((response) => {
        const newUsers = [...users];
        const userIndex = newUsers.findIndex((it) => it.id === user.id);
        if (userIndex !== -1) {
          newUsers[userIndex] = {
            ...newUsers[userIndex],
            ...response.data,
          };
          setUser(newUsers);
        }
      })
      .catch((error) => setFormErrors(error.response.data));
    handleClose();
  };

  return (
    <div className="wrapper">
      <Box sx={{
        flexGrow: 1, display: 'flex', flexDirection: 'column', rowGap: '20px',
      }}
      >
        <Grid item xs={12} style={{ textAlign: 'right' }}>
          <Button variant="contained" color="success" size="large" onClick={() => setCreateModalActive(true)}>
            Create User
          </Button>
        </Grid>
        <Grid item xs={12}>
          <UsersTable
            users={users}
            setUser={setUser}
            setEditUserModal={setEditUserModal}
            setUpdateModalActive={setUpdateModalActive}
          />
        </Grid>
      </Box>
      <CreateForm
        createModal={createModal}
        updateModal={updateModal}
        handleClose={handleClose}
        companies={companies}
        roles={roles}
        editUserModal={editUserModal}
        handleSubmit={createModal ? handleSubmit : handleEditSubmit}
        title={updateModal ? 'Update Profile' : 'Add User Of Company'}
        btnTitle={updateModal ? 'Update' : 'Create'}
        formErrors={formErrors}
      />
    </div>
  );
};

export default Users;
