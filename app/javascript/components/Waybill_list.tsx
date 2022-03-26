import * as React from 'react';

import { styled } from '@mui/material/styles';
import {
  Table, TableBody, TableCell, TableRow, TableContainer, TableHead, Paper, tableCellClasses,
} from '@mui/material';

import { useState } from 'react';
import httpClients from '../api/httpClient';
import Checkpoints from './driver/Checkpoints';
import WaybillGoods from './driver/WaybillGoods';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 17,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Waybill_list = () => {
  const [waybills, setWaybill] = useState(null);

  React.useEffect(() => {
    httpClients.waybill.gets_waybills().then((response) => {
      setWaybill(response.data);
    });
  }, []);
  if (!waybills) return (<p>Loading...</p>);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">status</StyledTableCell>
              <StyledTableCell align="right">startpoint</StyledTableCell>
              <StyledTableCell align="right">endpoint</StyledTableCell>
              <StyledTableCell align="right">action</StyledTableCell>
              <StyledTableCell align="right">goods</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {waybills.map((waybill) => (
              <StyledTableRow key={waybill.id}>
                <StyledTableCell align="right">
                  {waybill.status}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {waybill.startpoint}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {waybill.endpoint}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Checkpoints id={waybill.id} />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <WaybillGoods wayId={waybill.id} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Waybill_list;
