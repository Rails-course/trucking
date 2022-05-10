import * as React from 'react';

import { Box, Grid, Button } from '@mui/material';

import WarehouseTable from './Warehouse/WarehouseTable';
import WarehouseCreateForm from './Warehouse/CreateWarehouseForm';
import { Alert, Warehouse, WarehouseProps } from '../common/interfaces_types';
import SiteAlerts from './Alert';
import Search from './Search';

const Warehouses: React.FC<WarehouseProps> = (props: WarehouseProps) => {
  const { currentUserRole, warehousesJSON, warehousemansJSON } = props;
  const [isActiveModal, setModalActive] = React.useState<boolean>(false);
  const [warehouses, setWarehouses] = React.useState<Warehouse[]>(JSON.parse(warehousesJSON));
  const [formErrors, setFormErrors] = React.useState<string[]>([]);
  const [alertData, setAlertData] = React.useState<Alert>({ alertType: null, alertText: '', open: false });
  const [searchData, setSearchData] = React.useState<string[]>();

  const handleClose = () => {
    setModalActive(false);
    setFormErrors(null);
  };

  return (
    <div className="wrapper">
      <Box sx={{
        flexGrow: 1, display: 'flex', flexDirection: 'column', maxWidth: '66%',
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
              setSearchData={setSearchData}
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
        warehousemen={JSON.parse(warehousemansJSON)}
      />
      <SiteAlerts alertData={alertData} setAlertData={setAlertData} />
    </div>
  );
};

export default Warehouses;
