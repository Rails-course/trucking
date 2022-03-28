import * as React from 'react';

import {
  Table, TableBody, TableCell, TableRow, TableContainer,
  TableHead, Paper, tableCellClasses, Button, styled,
} from '@mui/material';

import httpClient from '../../api/httpClient';
import CreateWaybill from '../waybill/CreateWaybill';

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
  setGoods: any,
  setConsID: any,
}

const ConsignmentTable: React.FC<ConsignmentTableProps> = (props: ConsignmentTableProps) => {
  const {
    consignments, setConsignment, setModalGoodsActive, setGoods, setConsID,
  } = props;

  React.useEffect(() => {
    httpClient.consignments.getAll().then((response) => {
      setConsignment(response.data);
    });
  }, []);

  const handleGetGoods = (id) => {
    setModalGoodsActive(true);
    setConsID(id);
    httpClient.goods.getConsignmentGoods(id).then((response) => setGoods(response.data));
  };

  if (!consignments) return (<p>Loading...</p>);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Consignment number</StyledTableCell>
              <StyledTableCell align="center">Consignment seria</StyledTableCell>
              <StyledTableCell align="center">Bundle number</StyledTableCell>
              <StyledTableCell align="center">Bundle seria</StyledTableCell>
              <StyledTableCell align="center">Dispatcher</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Confirm goods</StyledTableCell>
              <StyledTableCell align="center">Waybill</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {consignments.map((consignment) => {
              const dispatcherFIO = `${consignment.dispatcher?.second_name} ${consignment.dispatcher?.first_name} ${consignment.dispatcher?.middle_name}`;
              return (
                <StyledTableRow
                  key={consignment.consignment_number}
                >
                  <StyledTableCell component="th" scope="company" align="center">
                    {consignment.consignment_number}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {consignment.consignment_seria}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {consignment.bundle_seria}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {consignment.bundle_number}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {dispatcherFIO}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {consignment.status}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button variant="outlined" onClick={() => handleGetGoods(consignment.id)}>
                      Check goods
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <CreateWaybill id={consignment.id} />
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ConsignmentTable;
