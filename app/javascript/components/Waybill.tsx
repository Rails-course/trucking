import * as React from 'react';

import {
  Table, TableBody, TableRow, TableContainer, TableHead, Paper, Box, Grid,
} from '@mui/material';

import httpClient from '../api/httpClient';
import WaybillTable from './Waybill/WaybillTable';

const Waybill = () => {
  const [waybills, setWaybill] = React.useState([]);

  React.useEffect(() => {
    const onResize = () => {
      httpClient.waybill.gets_waybills().then((response) => setWaybill(response.data));
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
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
            setWaybill={setWaybill}
          />
        </Grid>
      </Box>
    </div>
  );
};

export default Waybill;
