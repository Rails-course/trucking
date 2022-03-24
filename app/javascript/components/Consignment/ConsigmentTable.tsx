import * as React from 'react';

import { styled } from '@mui/material/styles';
import {
  Table, TableBody, TableCell, TableRow, TableContainer,
  TableHead, Paper, tableCellClasses, Tooltip,
} from '@mui/material';

import httpClient from '../../api/httpClient';
import CreateWaybill from '../CreateWaybill';

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

interface ConsignmentTableProps {
  consignments: any,
  setConsignment: any,
  setModalGoodsActive: any,
  setConsID: any,
  setGoods: any,
  consId: any,
}

const ConsignmentTable: React.FC<ConsignmentTableProps> = (props: ConsignmentTableProps) => {
  const {
    consignments, setConsignment, setModalGoodsActive, setConsID, setGoods, consId
  } = props;

  React.useEffect(() => {
    httpClient.consignments.getAll().then((response) => {
      setConsignment(response.data);
    });
  }, []);

  const handleGetGoods = () => {
    // BUGFIX: first click return consId = null
    if (consId) {
      setModalGoodsActive(true);
      httpClient.goods.getConsignmentGoods(consId).then((response) => setGoods(response.data))
    }
    return
  }

  if (!consignments) return (<p>Loading...</p>);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Number</StyledTableCell>
              <StyledTableCell align="right">Seria</StyledTableCell>
              <StyledTableCell align="right">Bundle seria</StyledTableCell>
              <StyledTableCell align="right">Bundle number</StyledTableCell>
              <StyledTableCell align="right">Dispatcher</StyledTableCell>
              <StyledTableCell align="right">Waybill</StyledTableCell>
            </TableRow>
          </TableHead>
          <Tooltip describeChild title="Click for open goods conformity form">
            <TableBody onClick={handleGetGoods}>
              {consignments.map((consignment) => {
                const dispatcherFIO = `${consignment.dispatcher?.second_name} ${consignment.dispatcher?.first_name} ${consignment.dispatcher?.middle_name}`;
                return (
                  <StyledTableRow
                    key={consignment.consignment_number}
                    onClick={() => setConsID(consignment.id)}
                  >
                    <StyledTableCell component="th" scope="company">
                      {consignment.consignment_number}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {consignment.consignment_seria}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {consignment.bundle_seria}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {consignment.bundle_number}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dispatcherFIO}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Tooltip>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ConsignmentTable;
