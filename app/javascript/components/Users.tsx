import * as React from 'react';

import Button from '@mui/material/Button';
import { Box, Grid } from '@mui/material';

import CreateForm from './Users/form/CreateForm';
import UsersTable from './Users/table/Table';
import { rows } from '../mixins/initialValues/userList';

const Users = () => {
  const [isActiveModal, setModalActive] = React.useState(false);
  const [users, setUser] = React.useState(rows);

  const handleClose = () => setModalActive(false);

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
          <UsersTable users={users} setUser={setUser} />
        </Grid>
      </Box>
      <CreateForm
        isActiveModal={isActiveModal}
        handleClose={handleClose}
        setUser={setUser}
      />
    </div>
  );
};

export default Users;
