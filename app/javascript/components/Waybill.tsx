import * as React from 'react';

import { Box, Grid } from '@mui/material';

import httpClient from '../api/httpClient';
import WaybillTable from './Waybill/WaybillTable';
import Checkpoints from './Driver/Checkpoints';
import SiteAlerts from './Alert';

const Waybill = ({ currentUserRole }) => {
  const [waybills, setWaybill] = React.useState([]);
  const [isWaybillModal, setWaybillModalActive] = React.useState(false);
  const [waybillID, setWaybillID] = React.useState(null);
  const [checkpoints, setCheckpoints] = React.useState(null);
  const [alertOpen, alertSetOpen] = React.useState(false);
  const [alertType, setAlertType] = React.useState()
  const [alertText, setAlertText] = React.useState()
  const componentMounted = React.useRef(true);

  React.useEffect(() => {
    httpClient.waybill.gets_waybills().then((response) => {
      if (componentMounted.current) setWaybill(response.data);
    });
    return () => {
      componentMounted.current = false;
    };
  }, []);

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
          <Grid item xs={12} style={{ textAlign: 'right' }}>
            <SiteAlerts
              alertType={alertType}
              alertText={alertText}
              alertOpen={alertOpen}
              alertSetOpen={alertSetOpen}
            />
          </Grid>
          <Grid item xs={12}>
            <WaybillTable
              waybills={waybills}
              setWaybillID={setWaybillID}
              setWaybillModalActive={setWaybillModalActive}
              setCheckpoints={setCheckpoints}
            />
          </Grid>
        </Grid>
      </Box>
      <Checkpoints
        id={waybillID}
        isWaybillModal={isWaybillModal}
        setWaybillModalActive={setWaybillModalActive}
        checkpoints={checkpoints}
        currentUserRole={currentUserRole}
        alertSetOpen={alertSetOpen}
        setAlertType={setAlertType}
        setAlertText={setAlertText}
      />
    </div>
  );
};

export default Waybill;
