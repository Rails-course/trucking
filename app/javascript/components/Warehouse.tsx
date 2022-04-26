import * as React from 'react';
import { useState } from 'react';

import { Box, Grid, Button } from '@mui/material';

import WarehouseTable from './Warehouse/WarehouseTable';
import WarehouseCreateForm from './Warehouse/CreateWarehouseForm';
import { WarehouseData, WarehouseProps } from '../common/interfaces_types';
import SiteAlerts from './Alert';
import Search from './Search';

const Warehouse: React.FC<WarehouseProps> = (props: WarehouseProps) => {
  const { currentUserRole } = props;
  const [isActiveModal, setModalActive] = useState(false);
  const [warehouses, setWarehouses] = React.useState<WarehouseData[]>([]);
  const [formErrors, setFormErrors] = React.useState([]);
  const [alertData, setAlertData] = React.useState<object>({ open: false });
  const [searchData, setSearchData] = React.useState();

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
          justifyContent="flex-end"
        >
          <Grid item md={3} style={{ textAlign: 'left' }}>
            <Search setData={setSearchData} Data={warehouses} keyField="" />
          </Grid>
          {currentUserRole === 'admin'
            ? (
              <Grid item xs={1.75} style={{ textAlign: 'right' }}>
                <Button variant="contained" color="success" size="large" style={{ height: '51px' }} onClick={() => setModalActive(true)}>
                  Create Warehouse
                </Button>
              </Grid>
            )
            : null}

          <Grid item xs={12}>
            <WarehouseTable
              warehouses={warehouses}
              setWarehouses={setWarehouses}
              setAlertData={setAlertData}
              currentUserRole={currentUserRole}
              searchData={searchData}
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
        setAlertData={setAlertData}
      />
      <SiteAlerts alertData={alertData} setAlertData={setAlertData} />
    </div>
  );
};

export default Warehouse;
