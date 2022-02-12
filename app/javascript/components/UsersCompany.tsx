import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';

import Button from '@mui/material/Button';
import { Box, Grid } from '@mui/material';
import CreateForm from './CreateForm';

function UsersCompany() {
  const [isActiveModal, setModalActive] = useState(false);

  const csrf = document.querySelector("meta[name='csrf-token']").getAttribute('content');
  axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf;

  const handleClose = () => {
    setModalActive(false);
  };

  return (
    <div className="wrapper">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            Form for create of User
          </Grid>
          <Grid item xs={4}>
            <Button variant="outlined" onClick={() => setModalActive(true)} color="inherit">
              Create User
            </Button>
          </Grid>
          <CreateForm isActiveModal={isActiveModal} handleClose={handleClose} />
        </Grid>
      </Box>
    </div>
  );
}

export default UsersCompany;
