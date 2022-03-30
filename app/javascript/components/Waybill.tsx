import * as React from 'react';

import {
  Table, TableBody, TableRow, TableContainer, TableHead, Paper, Box,
} from '@mui/material';

import httpClients from '../api/httpClient';
import Checkpoints from './Driver/Checkpoints';
import WaybillGoods from './Driver/WaybillGoods';
import { waybillTableCell } from '../constants/waybillFields';
import { StyledTableCell, StyledTableRow } from '../utils/style';

const Waybill = () => {
  const [waybills, setWaybill] = React.useState(null);

  React.useEffect(() => {
    const onResize = () => {
      httpClients.waybill.gets_waybills().then((response) => setWaybill(response.data));
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // if (!waybills) return (<p>No data yet ...</p>);

  return (
    <div className="wrapper">
      <Box sx={{
        flexGrow: 1, display: 'flex', rowGap: '20px', flexDirection: 'column',
      }}
      >
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                {waybillTableCell.map((cell) => (
                  <StyledTableCell key={cell.id} align={cell.align}>{cell.title}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {!waybills
                ? (
                  <TableRow>
                    <StyledTableCell>No data yet ...</StyledTableCell>
                  </TableRow>
                )
                : waybills.map((waybill) => (
                  <StyledTableRow key={waybill.id}>
                    <StyledTableCell>{waybill.status}</StyledTableCell>
                    <StyledTableCell align="center">{waybill.startpoint}</StyledTableCell>
                    <StyledTableCell align="center">{waybill.endpoint}</StyledTableCell>
                    <StyledTableCell align="right"><Checkpoints id={waybill.id} /></StyledTableCell>
                    <StyledTableCell align="right"><WaybillGoods wayId={waybill.id} /></StyledTableCell>
                  </StyledTableRow>
                )) }
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default Waybill;
