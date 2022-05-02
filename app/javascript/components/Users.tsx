import * as React from 'react';

import { Box, Grid, Button } from '@mui/material';

import CreateForm from './Users/form/CreateForm';
import UsersTable from './Users/table/Table';
import { userFormValues } from '../initialValues/userInitialValues';
import httpClient from '../api/httpClient';
import Search from './Search';
import { UsersProps } from '../common/interfaces_types';

const Users: React.FC<UsersProps> = (props: UsersProps) => {
  const { rolesJSON, companiesJSON, usersJSON } = props;

  const [createModal, setCreateModalActive] = React.useState(false);
  const [updateModal, setUpdateModalActive] = React.useState(false);
  const [editUserModal, setEditUserModal] = React.useState(null);
  const [formErrors, setFormErrors] = React.useState([]);
  const [users, setUser] = React.useState(JSON.parse(usersJSON));
  const [searchData, setSearchData] = React.useState();

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
        handleClose();
      })
      .catch((error) => setFormErrors(error.response.data));
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
          handleClose();
        }
      })
      .catch((error) => setFormErrors(error.response.data));
  };

  return (
    <div className="wrapper">
      <Box sx={{
        flexGrow: 1, display: 'flex', flexDirection: 'column', rowGap: '20px',
      }}
      >
        <Grid
          container
          rowSpacing={3}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          justifyContent="flex-end"
        >
          <Grid item md={2} style={{ textAlign: 'left' }}>
            <Search setData={setSearchData} Data={users} keyField="" />
          </Grid>
          <Grid item xs={1.4} style={{ textAlign: 'right' }}>
            <Button variant="contained" color="success" size="large" style={{ height: '51px' }} onClick={() => setCreateModalActive(true)}>
              Create User
            </Button>
          </Grid>
          <Grid item xs={12}>
            <UsersTable
              users={users}
              setUser={setUser}
              setEditUserModal={setEditUserModal}
              setUpdateModalActive={setUpdateModalActive}
              searchData={searchData}
            />
          </Grid>
        </Grid>
      </Box>
      <CreateForm
        createModal={createModal}
        updateModal={updateModal}
        handleClose={handleClose}
        companies={JSON.parse(companiesJSON)}
        roles={JSON.parse(rolesJSON)}
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
