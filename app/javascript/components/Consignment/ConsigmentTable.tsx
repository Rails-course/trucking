import * as React from 'react';

import {
  Table, TableBody, TableRow, TableContainer, TableHead, Paper, Button,
  TablePagination, FormControlLabel, Switch, Box, CircularProgress,
} from '@mui/material';

import { consignmentTable } from '../../constants/consignmentFields';
import { StyledTableCell, StyledTableRow } from '../../utils/style';
import { ConsignmentTableProps } from '../../common/interfaces_types';

const ConsignmentTable: React.FC<ConsignmentTableProps> = (props: ConsignmentTableProps) => {
  const {
    consignments, setModalGoodsActive, setGoods, setConsID, setWayBillActive,
    currentUserRole, setCreateWaybillData, searchData,
  } = props;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [dense, setDense] = React.useState(false);

  const waybillID = null;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - consignments.length) : 0;

  const handleGetGoods = (consignment) => {
    setModalGoodsActive(true);
    setConsID(consignment.id);
    setGoods(consignment.goods);
  };

  const openWaybillCreateModal = (consID) => {
    const consignment = consignments.find((consignment) => consID === consignment.id);
    const truckNumber = consignment.truck.truck_number;
    const driverFio = `${consignment.driver.first_name} ${consignment.driver.second_name} ${consignment.driver.middle_name}`;
    setConsID(consID);
    setCreateWaybillData({ truckNumber, driverFio });
    setWayBillActive(true);
  };

  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const consignmentsData = searchData || consignments;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 700 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <TableHead>
              <TableRow>
                {consignmentTable.map((cell) => <StyledTableCell align="center" key={cell.id}>{cell.title}</StyledTableCell>)}
                {currentUserRole === 'manager'
                  ? <StyledTableCell align="center">Waybill</StyledTableCell>
                  : null}
              </TableRow>
            </TableHead>
            <TableBody>
              {!consignments
                ? (
                  <TableRow>
                    <StyledTableCell><CircularProgress color="inherit" /></StyledTableCell>
                  </TableRow>
                )
                : consignmentsData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((consignment) => {
                    const dispatcherFIO = `${consignment.dispatcher?.second_name} ${consignment.dispatcher?.first_name} ${consignment.dispatcher?.middle_name}`;
                    const managerFIO = `${consignment.manager?.second_name} ${consignment.manager?.first_name} ${consignment.manager?.middle_name}`;
                    let waybillStatus = null;
                    if (consignment.hasOwnProperty('waybill')) waybillStatus = consignment.waybill.status;
                    return (
                      <StyledTableRow key={consignment.id}>
                        <StyledTableCell align="center">{consignment.consignment_seria}</StyledTableCell>
                        <StyledTableCell component="th" scope="company" align="center">{consignment.consignment_number}</StyledTableCell>
                        <StyledTableCell align="center" style={{ fontWeight: 'bold' }}>{consignment.status}</StyledTableCell>
                        <StyledTableCell align="center">{dispatcherFIO}</StyledTableCell>
                        <StyledTableCell align="center">{consignment.manager ? managerFIO : "Isn't checked"}</StyledTableCell>
                        <StyledTableCell align="center">{consignment.bundle_seria}</StyledTableCell>
                        <StyledTableCell align="center">{consignment.bundle_number}</StyledTableCell>
                        <StyledTableCell align="center">
                          <Button variant="outlined" onClick={() => handleGetGoods(consignment)}>
                            Goods
                          </Button>
                        </StyledTableCell>
                        {currentUserRole === 'manager'
                          ? (
                            <StyledTableCell align="center">
                              <Button
                                variant="outlined"
                                disabled={!(consignment.status === 'checked' && !waybillStatus)}
                                onClick={() => openWaybillCreateModal(consignment.id)}
                              >
                                Create Waybill
                              </Button>
                            </StyledTableCell>
                          )
                          : null}
                      </StyledTableRow>
                    );
                  })}
              {emptyRows > 0 && (
                <StyledTableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <StyledTableCell colSpan={6} />
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={consignments.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <div>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
          sx={{ color: 'white', fontWeight: 'bolder' }}
        />
      </div>
    </Box>
  );
};

export default ConsignmentTable;
