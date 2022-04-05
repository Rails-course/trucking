// @ts-ignore
import * as React from 'react';

// @ts-ignore
import {
  Table, TableBody, TableRow, TableContainer, TableHead, Paper, Box, Grid,
} from '@mui/material';

import WaybillTable from './Waybill/WaybillTable';

const Waybill = () => {
  const [waybills, setWaybill] = React.useState([]);

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
