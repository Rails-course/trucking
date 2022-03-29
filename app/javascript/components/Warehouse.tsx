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

  const handleClose = () => setModalActive(false);

  const handleSubmit = (warehouse: warehouseFormValues) => {
    httpClient.warehouses.create(warehouse)
      .then((response) => setWarehouses((prev) => [...prev, response.data]));
  };

  React.useEffect(() => {
    httpClient.warehouses.get_all().then((response) => setWarehouses(response.data));
  }, []);

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
          <WarehouseTable warehouses={warehouses} setWarehouses={setWarehouses} />
        </Grid>
      </Box>
      <WarehouseCreateForm
        isActiveModal={isActiveModal}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default Warehouse;
