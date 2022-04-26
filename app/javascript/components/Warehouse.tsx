import * as React from 'react';

import { Box, Grid, Button } from '@mui/material';

import WarehouseTable from './Warehouse/WarehouseTable';
import WarehouseCreateForm from './Warehouse/CreateWarehouseForm';
import { WarehouseData, WarehouseProps } from '../common/interfaces_types';
import SiteAlerts from './Alert';

const Warehouse: React.FC<WarehouseProps> = (props: WarehouseProps) => {
  const { currentUserRole, warehousesJSON, warehousemansData } = props;
  const [isActiveModal, setModalActive] = React.useState(false);
  const [warehouses, setWarehouses] = React.useState<WarehouseData[]>(JSON.parse(warehousesJSON));
  const [formErrors, setFormErrors] = React.useState([]);
  const [alert, setAlert] = React.useState({ text: '', type: '', open: false });

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
          <Grid item xs={9} style={{ textAlign: 'right' }} />
          {currentUserRole === 'admin'
            ? (
              <Grid item xs={3} style={{ textAlign: 'right' }}>
                <Button variant="contained" color="success" size="large" style={{ marginBottom: '6px' }} onClick={() => setModalActive(true)}>
                  Create Warehouse
                </Button>
              </Grid>
            )
            : null}
          <Grid item xs={12}>
            <WarehouseTable
              warehouses={warehouses}
              setWarehouses={setWarehouses}
              setAlert={setAlert}
              currentUserRole={currentUserRole}
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
        setAlert={setAlert}
        warehousemansData={warehousemansData}
      />
      <SiteAlerts alert={alert} />
    </div>
  );
};

export default Warehouse;
