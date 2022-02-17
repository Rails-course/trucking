import * as React from 'react';
import { useState } from 'react';
// import axios from 'axios';

import Button from '@mui/material/Button';
import { Box, Grid } from '@mui/material';
import CreateForm from './CreateForm';
import CustomizedTables from './UsersTable';

function Users() {
  const [isActiveModal, setModalActive] = useState(false);

  // const csrf = document.querySelector("meta[name='csrf-token']").getAttribute('content');
  // axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf;

  const handleClose = () => {
    setModalActive(false);
  };

  return (
    <div className="wrapper">
      <Box sx={{
        flexGrow: 1, display: 'flex', rowGap: '20px', flexDirection: 'column', alignItems: 'center',
      }}
      >
        <Grid item xs={12}>
          <Button variant="outlined" onClick={() => setModalActive(true)} color="inherit">
            Create User
          </Button>
        </Grid>
        <Grid item xs={12}>
          {/* <UsersTable /> */}
          <CustomizedTables />
        </Grid>
      </Box>
      <CreateForm isActiveModal={isActiveModal} handleClose={handleClose} />
    </div>
  );
}

export default Users;
