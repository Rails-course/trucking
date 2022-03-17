import * as React from 'react';
import { useState } from 'react';

import Button from '@mui/material/Button';
import { Box, Grid } from '@mui/material';
// import CreateCompanyForm from './CreateCompanyForm';
// import CompanyTable from './CompanyTable';

function Warehouse() {
  const [isActiveModal, setModalActive] = useState(false);
  const [warehouses, setWarehouses] = React.useState(null);

  const handleClose = () => {
    setModalActive(false);
  };

  return (
    <div className="wrapper">
      <Box sx={{
        flexGrow: 1, display: 'flex', flexDirection: 'column', rowGap: '20px',
      }}
      >
        <Grid item xs={12}>
          <Button variant="outlined" onClick={() => setModalActive(true)} color="inherit">
            Create Warehouse
          </Button>
        </Grid>
        <Grid item xs={12}>
          <p>Warehouse table</p>
          {/* <CompanyTable companies={companies} setCompany={setCompany} /> */}
        </Grid>
      </Box>
      {/* <CreateCompanyForm
        isActiveModal={isActiveModal}
        handleClose={handleClose}
        setCompany={setCompany}
      /> */}
    </div>
  );
}

export default Warehouse;
