import * as React from 'react';
import { useState } from 'react';

import Button from '@mui/material/Button';
import { Box, Grid } from '@mui/material';
import CreateConsignmentForm from './CreateConsignmentForm';

function Consignment() {
  const [isActiveModal, setModalActive] = useState(false);

  const handleClose = () => {
    setModalActive(false);
  };

  return (
    <div className="wrapper">
      <Box sx={{
        flexGrow: 1, display: 'flex', rowGap: '20px', flexDirection: 'column',
      }}
      >
        <Grid item xs={12}>
          <Button variant="outlined" onClick={() => setModalActive(true)} color="inherit">
            Create Consignment
          </Button>
        </Grid>
        <Grid item xs={12}>
          {/* <ConsignmentTable consignments={consignments} setConsignment={setConsignment} /> */}
        </Grid>
      </Box>
      <CreateConsignmentForm isActiveModal={isActiveModal} handleClose={handleClose} />
    </div>
  );
}

export default Consignment;
