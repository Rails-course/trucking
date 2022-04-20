import * as React from 'react';

import Button from '@mui/material/Button';
import { Box, Grid } from '@mui/material';

import httpClient from '../api/httpClient';
import WriteOffActTable from './WriteOffAct/WriteOffActTable';
import CreateWriteOffActForm from './WriteOffAct/CreateWriteOffActForm';
import SiteAlerts from './Alert';

const WriteOffActs = ({ currentUserRole }) => {
  const [isActiveModal, setModalActive] = React.useState(false);
  const [writeOffActs, setWriteOffActs] = React.useState([]);
  const [formErrors, setFormErrors] = React.useState([]);
  const [alertOpen, alertSetOpen] = React.useState<boolean>(false);
  const [alertType, setAlertType] = React.useState<string>();
  const [alertText, setAlertText] = React.useState<string>();

  const handleClose = () => {
    setModalActive(false);
    setFormErrors(null);
  };

  const handleSubmit = async (writeOffAct) => {
    await httpClient.writeOffActs.create(writeOffAct)
      .then((response) => {
        setWriteOffActs((prev) => [...prev, response.data]);
        setModalActive(false);
        setAlertType('success');
        setAlertText('Successfully created write-off act!');
        alertSetOpen(true);
        setTimeout(() => {
          alertSetOpen(false);
        }, 5000);
      })
      .catch((error) => {
        setFormErrors(error.response.data);
        setAlertType('error');
        setAlertText('Something went wrong with creating write-off act');
        alertSetOpen(true);
        setTimeout(() => {
          alertSetOpen(false);
        }, 5000);
      });
  };

  return (
    <div className="wrapper">
      <Box sx={{
        flexGrow: 1, display: 'flex', flexDirection: 'column', rowGap: '20px', maxWidth: '70%',
      }}
      >
        <Grid
          container
          rowSpacing={3}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={9} style={{ textAlign: 'right' }}>
            <SiteAlerts
              alertType={alertType}
              alertText={alertText}
              alertOpen={alertOpen}
              alertSetOpen={alertSetOpen}
            />
          </Grid>
          {['driver', 'manager'].includes(currentUserRole)
            ? (
              <Grid item xs={3} style={{ textAlign: 'right' }}>
                <Button variant="contained" color="success" size="large" onClick={() => setModalActive(true)}>
                  Create Write-off Act
                </Button>
              </Grid>
            )
            : null}
          <Grid item xs={12}>
            <WriteOffActTable
              writeOffActs={writeOffActs}
              setWriteOffActs={setWriteOffActs}
            />
          </Grid>
        </Grid>
      </Box>
      <CreateWriteOffActForm
        isActiveModal={isActiveModal}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        formErrors={formErrors}
      />
    </div>
  );
};

export default WriteOffActs;
