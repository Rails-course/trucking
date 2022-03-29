import * as React from 'react';

import {
  Table, TableBody, TableCell, TableRow, TableContainer,
  TableHead, Paper, tableCellClasses, styled, Box,
} from '@mui/material';

import httpClients from '../api/httpClient';
import Checkpoints from './Driver/Checkpoints';
import WaybillGoods from './Driver/WaybillGoods';

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

const Waybill = () => {
  const [waybills, setWaybill] = React.useState(null);

  React.useEffect(() => {
    httpClients.waybill.gets_waybills().then((response) => {
      setWaybill(response.data);
    });
  }, []);

  if (!waybills) return (<p>No data yet ...</p>);

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
                <StyledTableCell align="left">Status</StyledTableCell>
                <StyledTableCell align="center">Start point</StyledTableCell>
                <StyledTableCell align="center">End point</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
                <StyledTableCell align="right">Goods</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {waybills.map((waybill) => (
                <StyledTableRow key={waybill.id}>
                  <StyledTableCell>
                    {waybill.status}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {waybill.startpoint}
                  </StyledTableCell>
                  <StyledTableCell align="center">
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
      </Box>
    </div>
  );
};

export default Waybill;
