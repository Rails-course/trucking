import * as React from 'react';
import { useState } from 'react';

import Button from '@mui/material/Button';
import { Box, Grid } from '@mui/material';
import CreateCompanyForm from './CreateCompanyForm';
import CompanyTable from './CompanyTable';

function Company() {
  const [isActiveModal, setModalActive] = useState(false);
  const [companies, setCompany] = React.useState(null);

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
            Create Company
          </Button>
        </Grid>
        <Grid item xs={12}>
          <CompanyTable  companies={companies} setCompany={setCompany}/>
        </Grid>
      </Box>
      <CreateCompanyForm isActiveModal={isActiveModal} setCompany={setCompany} handleClose={handleClose} />
    </div>
  );
}

export default Company;
