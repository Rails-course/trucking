import * as React from 'react';

import { Box, Grid, Button } from '@mui/material';

import CreateForm from './Users/form/CreateForm';
import UsersTable from './Users/table/Table';
import { UserData } from '../mixins/initialValues/userList';
import { userFormValues } from '../initialValues/userInitialValues';
import httpClient from '../api/httpClient';
import Search from "./Search";

const Users = () => {
  const [isActiveModal, setModalActive] = React.useState(false);
  const [users, setUser] = React.useState<UserData[]>(null);
  const [userIds, setUserId] = React.useState([]);
  const [editUserModal, setEditUserModal] = React.useState(null);
  const [formErrors, setFormErrors] = React.useState([]);
  const [searchData, setSearchData] = React.useState();

  const isModalActive = isActiveModal || !!editUserModal;

  const handleClose = () => {
    setModalActive(false);
    setEditUserModal(null);
    setFormErrors(null);
  };

  const handleSubmit = async (user: userFormValues) => {
    await httpClient.users.create(user);
    setUser((prevUser) => [...prevUser, user]);
  };

  const handleEditSubmit = async (data) => {
    await httpClient.users.update(data.id, data)
      .then(() => {
        const newUsers = [...users];
        const userIndex = newUsers.findIndex((it) => it.id === data.id);
        if (userIndex !== -1) {
          newUsers[userIndex] = {
            ...newUsers[userIndex],
            ...data,
          };
          setUser(newUsers);
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
        <Grid item xs={12} style={{ textAlign: 'right' }}>
            <Grid item md={3} style={{ textAlign: 'left' }}>
                <Search setData={setSearchData} Data={users} />
            </Grid>
          <Button variant="contained" color="success" size="large" onClick={() => setModalActive(true)}>
            Create User
          </Button>
        </Grid>
        <Grid item xs={12}>
          <UsersTable
            users={users}
            setUser={setUser}
            userIds={userIds}
            setUserId={setUserId}
            setEditUserModal={setEditUserModal}
            searchData={searchData}
          />
        </Grid>
      </Box>
      <CreateForm
        isActiveModal={isModalActive}
        handleClose={handleClose}
        editUserModal={editUserModal}
        handleSubmit={isActiveModal ?   handleSubmit:handleEditSubmit}
        title={editUserModal ? 'Update Profile' : 'Add User Of Company'}
        btnTitle={editUserModal ? 'Update' : 'Create'}
        formErrors={formErrors}
      />
    </div>
  );
};

export default Users;
