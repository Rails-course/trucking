import * as React from 'react';

import Button from '@mui/material/Button';
import { Box, Grid } from '@mui/material';

import CreateForm from './Users/form/CreateForm';
import UsersTable from './Users/table/Table';
import { Data, rows } from '../mixins/initialValues/userList';
import { FormValues } from '../mixins/initialValues/initialValues';
import httpClient from '../api/httpClient';

const Users = () => {
  const [isActiveModal, setModalActive] = React.useState(false);
  const [users, setUser] = React.useState<Data[]>(rows);
  const [userIds, setUserId] = React.useState([]);
  const [editUserModal, setEditUserModal] = React.useState(null);

  const isModalActive = isActiveModal || !!editUserModal;
  const handleClose = () => {
    setModalActive(false);
    setEditUserModal(null);
  };

  const handleSubmit = async (user: FormValues) => {
    await httpClient.users.create(user);
    setUser((prevUser) => [...prevUser, user]);
  };

  // const handleEditSubmit = async (user: FormValues) => {
  //   await httpClient.users.create(user);
  //   setUser((prevUser) => [...prevUser, user]);
  // };

  return (
    <div className="wrapper">
      <Box sx={{
        flexGrow: 1, display: 'flex', flexDirection: 'column', rowGap: '20px',
      }}
      >
        <Grid item xs={12}>
          <Button variant="outlined" onClick={() => setModalActive(true)} color="inherit">
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
          />
        </Grid>
      </Box>
      <CreateForm
        isActiveModal={isModalActive}
        handleClose={handleClose}
        editUserModal={editUserModal}
        handleSubmit={handleSubmit}
        title={editUserModal ? 'Update Profile' : 'Add User Of Company'}
      />
    </div>
  );
};

export default Users;
