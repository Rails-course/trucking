import * as React from 'react';
import { useState } from 'react';

import { Box, Grid, Button } from '@mui/material';

import httpClient from '../api/httpClient';
import WarehouseTable from './Warehouse/WarehouseTable';
import WarehouseCreateForm from './Warehouse/CreateWarehouseForm';
import { WarehouseData } from '../common/interfaces_types';
import SiteAlerts from './Alert';

const Warehouse = () => {
  const [isActiveModal, setModalActive] = useState(false);
  const [warehouses, setWarehouses] = React.useState<WarehouseData[]>([]);
  const [formErrors, setFormErrors] = React.useState([]);
  const [alertOpen, alertSetOpen] = React.useState(false);
  const [alertType, setAlertType] = React.useState()
  const [alertText, setAlertText] = React.useState()

  const handleClose = () => {
    setModalActive(false);
    setFormErrors(null);
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
          <Grid item xs={9} style={{ textAlign: 'right' }}>
            <SiteAlerts
              alertType={alertType}
              alertText={alertText}
              alertOpen={alertOpen}
              alertSetOpen={alertSetOpen}
            />
          </Grid>
          <Grid item xs={3} style={{ textAlign: 'right' }}>
            <Button variant="contained" color="success" size="large" style={{ marginBottom: '6px' }} onClick={() => setModalActive(true)}>
              Create Warehouse
            </Button>
          </Grid>
          <Grid item xs={12}>
            <WarehouseTable
              warehouses={warehouses}
              setWarehouses={setWarehouses}
              alertSetOpen={alertSetOpen}
              setAlertType={setAlertType}
              setAlertText={setAlertText}
            />
          </Grid>
        </Grid>
      </Box>
      <WarehouseCreateForm
        isActiveModal={isActiveModal}
        handleClose={handleClose}
        setWarehouses={setWarehouses}
        formErrors={formErrors}
        setFormErrors={setFormErrors}
        alertSetOpen={alertSetOpen}
        setAlertType={setAlertType}
        setAlertText={setAlertText}
      />
    </div>
  );
}

export default Warehouse;
