import * as React from 'react';
import { useState } from 'react';

import { Box, Grid, Button } from '@mui/material';

import CompanyTable from './Company/CompanyTable';
import CreateCompanyForm from './Company/CreateCompanyForm';
import SiteAlerts from './Alert';
import { CompanyProps } from '../common/interfaces_types';
import Search from './Search';
import httpClient from '../api/httpClient';

const Company: React.FC<CompanyProps> = (props: CompanyProps) => {
  const { currentUserRole, companiesJSON } = props;
  const [isActiveModal, setModalActive] = useState(false);
  const [companies, setCompany] = React.useState(JSON.parse(companiesJSON));
  const [formErrors, setFormErrors] = React.useState([]);
  const [searchData, setSearchData] = React.useState();
  const [alertData, setAlertData] = React.useState<object>({ open: false });

  const handleClose = () => {
    setModalActive(false);
    setFormErrors(null);
  };

  const suspendCompany = (id,alertText) => {
    httpClient.companies.updateStatus(id).then((response) => {
      const companyIndex = companies.findIndex((element) => element.id === id);
      companies[companyIndex] = response.data;
      setCompany(companies);
      setAlertData({
        alertType: 'info',
        alertText: `Company successfully ${alertText}`,
        open: true,
      });
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
          justifyContent="flex-end"
        >
          <Grid item md={3} style={{ textAlign: 'left' }}>
            <Search setData={setSearchData} Data={companies} keyField="" />
          </Grid>
          {currentUserRole === 'system administrator'
            ? (
              <Grid item xs={1.75} style={{ textAlign: 'right' }}>
                <Button variant="contained" color="success" size="large" style={{ height: '51px' }} onClick={() => setModalActive(true)}>
                  Create Company
                </Button>
              </Grid>
            )
            : null}

          <Grid item xs={12}>
            <CompanyTable
              companies={companies}
              setCompany={setCompany}
              setAlertData={setAlertData}
              searchData={searchData}
              suspendCompany={suspendCompany}
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
        setAlertData={setAlertData}
      />
      <SiteAlerts alertData={alertData} setAlertData={setAlertData} />
    </div>
  );
};

export default Company;
