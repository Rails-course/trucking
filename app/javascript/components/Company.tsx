import * as React from 'react';
import { useState } from 'react';

import { Box, Grid, Button } from '@mui/material';

import CompanyTable from './Company/CompanyTable';
import CreateCompanyForm from './Company/CreateCompanyForm';
import SiteAlerts from './Alert';
import { CompanyProps } from '../common/interfaces_types';
import httpClient from '../api/httpClient';

const Company: React.FC<CompanyProps> = (props: CompanyProps) => {
  const { currentUserRole, companiesJSON } = props;
  const [isActiveModal, setModalActive] = useState(false);
  const [companies, setCompany] = React.useState(JSON.parse(companiesJSON));
  const [formErrors, setFormErrors] = React.useState([]);
  const [alertOpen, alertSetOpen] = React.useState(false);
  const [alertType, setAlertType] = React.useState('');
  const [alertText, setAlertText] = React.useState('');

  const handleClose = () => {
    setModalActive(false);
    setFormErrors(null);
  };

  const suspendCompany = (id) => {
    httpClient.companies.suspend(id).then((response) => {
      const companyIndex = companies.findIndex((element) => element.id === id);
      companies[companyIndex] = response.data;
      setCompany(companies);
      setAlertType('info');
      setAlertText('Company successfully suspended');
      alertSetOpen(true);
    });
  };

  const resumeCompany = (id) => {
    httpClient.companies.resume(id).then((response) => {
      const companyIndex = companies.findIndex((element) => element.id === id);
      companies[companyIndex] = response.data;
      setCompany(companies);
      setAlertType('info');
      setAlertText('Company successfully resumed');
      alertSetOpen(true);
    });
  };

  return (
    <div className="wrapper">
      <Box sx={{
        flexGrow: 1, display: 'flex', flexDirection: 'column', maxWidth: '70%',
      }}
      >
        <Grid
          container
          rowSpacing={3}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={9} style={{ textAlign: 'right' }} />
          {currentUserRole === 'system administrator'
            ? (
              <Grid item xs={3} style={{ textAlign: 'right' }}>
                <Button variant="contained" color="success" size="large" style={{ marginBottom: '6px' }} onClick={() => setModalActive(true)}>
                  Create Company
                </Button>
              </Grid>
            )
            : null}
          <Grid item xs={12}>
            <CompanyTable
              companies={companies}
              setCompany={setCompany}
              alertSetOpen={alertSetOpen}
              setAlertType={setAlertType}
              setAlertText={setAlertText}
              suspendCompany={suspendCompany}
              resumeCompany={resumeCompany}
            />
          </Grid>
        </Grid>
      </Box>
      <CreateCompanyForm
        isActiveModal={isActiveModal}
        handleClose={handleClose}
        setCompany={setCompany}
        formErrors={formErrors}
        setFormErrors={setFormErrors}
        alertSetOpen={alertSetOpen}
        setAlertType={setAlertType}
        setAlertText={setAlertText}
      />
      <SiteAlerts
        alertType={alertType}
        alertText={alertText}
        alertOpen={alertOpen}
        alertSetOpen={alertSetOpen}
      />
    </div>
  );
};

export default Company;
