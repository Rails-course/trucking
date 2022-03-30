import * as React from 'react';
import { useState } from 'react';

import { Box, Grid, Button } from '@mui/material';

import CompanyTable from './Company/CompanyTable';
import CreateCompanyForm from './Company/CreateCompanyForm';

const Company = () => {
  const [isActiveModal, setModalActive] = useState(false);
  const [companies, setCompany] = React.useState(null);
  const [formErrors, setFormErrors] = React.useState([]);

  const handleClose = () => {
    setModalActive(false);
    setFormErrors(null);
  };

  return (
    <div className="wrapper">
      <Box sx={{
        flexGrow: 1, display: 'flex', flexDirection: 'column', rowGap: '20px', maxWidth: '70%',
      }}
      >
        <Grid item xs={12} style={{ textAlign: 'right' }}>
          <Button variant="contained" color="success" size="large" onClick={() => setModalActive(true)}>
            Create Company
          </Button>
        </Grid>
        <Grid item xs={12}>
          <CompanyTable companies={companies} setCompany={setCompany} />
        </Grid>
      </Box>
      <CreateCompanyForm
        isActiveModal={isActiveModal}
        handleClose={handleClose}
        setCompany={setCompany}
        formErrors={formErrors}
        setFormErrors={setFormErrors}
      />
    </div>
  );
};

export default Company;
