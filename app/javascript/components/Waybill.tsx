import * as React from 'react';

import { Box, Grid } from '@mui/material';

import httpClient from '../api/httpClient';
import WaybillTable from './Waybill/WaybillTable';
import Checkpoints from './Driver/Checkpoints';

const Waybill = ({ currentUserRole }) => {
  const [waybills, setWaybill] = React.useState([]);
  const [isWaybillModal, setWaybillModalActive] = React.useState(false);
  const [waybillID, setWaybillID] = React.useState(null);
  const [checkpoints, setCheckpoints] = React.useState(null);
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
        <Grid item xs={12}>
          <WaybillTable
            waybills={waybills}
            setWaybillID={setWaybillID}
            setWaybillModalActive={setWaybillModalActive}
            setCheckpoints={setCheckpoints}
          />
        </Grid>
      </Box>
      <Checkpoints
        id={waybillID}
        isWaybillModal={isWaybillModal}
        setWaybillModalActive={setWaybillModalActive}
        checkpoints={checkpoints}
        currentUserRole={currentUserRole}
      />
    </div>
  );
};

export default Waybill;
