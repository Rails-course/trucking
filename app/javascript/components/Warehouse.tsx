import * as React from 'react';
import { useState } from 'react';

import { Box, Grid, Button } from '@mui/material';

import httpClient from '../api/httpClient';
import WarehouseTable from './Warehouse/WarehouseTable';
import WarehouseCreateForm from './Warehouse/CreateForm';
import { warehouseFormValues } from '../initialValues/warehouseInitialValues';
import { WarehouseData } from '../common/interfaces_types';

function Warehouse() {
  const [isActiveModal, setModalActive] = useState(false);
  const [warehouses, setWarehouses] = React.useState<WarehouseData[]>([]);
  const [formErrors, setFormErrors] = React.useState([]);

  const handleClose = () => {
    setModalActive(false);
    setFormErrors(null);
  };

  const handleSubmit = (warehouse: warehouseFormValues) => {
    httpClient.warehouses.create(warehouse)
      .then((response) => setWarehouses((prev) => [...prev, response.data]))
      .catch((error) => setFormErrors(error.response.data));
  };

  React.useEffect(() => {
    httpClient.warehouses.get_all().then((response) => setWarehouses(response.data));
  }, []);

  return (
    <div className="wrapper">
      <Box sx={{
        flexGrow: 1, display: 'flex', flexDirection: 'column', rowGap: '20px', maxWidth: '70%',
      }}
      >
        <Grid item xs={12} style={{ textAlign: 'right' }}>
          <Button variant="contained" color="success" size="large" onClick={() => setModalActive(true)}>
            Create Warehouse
          </Button>
        </Grid>
        <Grid item xs={12}>
          <WarehouseTable warehouses={warehouses} setWarehouses={setWarehouses} />
        </Grid>
      </Box>
      <WarehouseCreateForm
        isActiveModal={isActiveModal}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        formErrors={formErrors}
      />
    </div>
  );
}

export default Warehouse;
