import * as React from 'react';

import {
  TableContainer, Paper, Table, TableHead, TableRow, TableBody, Button, TablePagination,
  FormControlLabel, Switch, Box, CircularProgress,
} from '@mui/material';

import { waybillTableCell } from '../../constants/waybillFields';
import { StyledTableCell, StyledTableRow } from '../../utils/style';
import { WaybillTableProps } from '../../common/interfaces_types';

const WaybillTable: React.FC<WaybillTableProps> = (props: WaybillTableProps) => {
  const {
    waybills, setWaybillModalActive, setWaybillID, searchData, setCheckpoints,
  } = props;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [dense, setDense] = React.useState(false);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - waybills.length) : 0;

  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const handleGetCheckpoint = (waybill) => {
    setWaybillModalActive(true);
    setWaybillID(waybill.id);
    setCheckpoints(waybill.checkpoints);
  };

  const waybillsData = searchData || waybills;

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
                {waybillTableCell.map((cell) => (
                  <StyledTableCell key={cell.id} align={cell.align}>{cell.title}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {!waybills
                ? (
                  <TableRow>
                    <StyledTableCell><CircularProgress color="inherit" /></StyledTableCell>
                  </TableRow>
                )
                : waybillsData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((waybill) => {
                    const startpointAddress = `${waybill.startpoint.town} ${waybill.startpoint.street} ${waybill.startpoint.building}`;
                    const endpointAddress = `${waybill.endpoint.town} ${waybill.endpoint.street} ${waybill.endpoint.building}`;
                    return (
                      <StyledTableRow key={waybill.id}>
                        <StyledTableCell>{waybill.waybill_seria}</StyledTableCell>
                        <StyledTableCell>{waybill.waybill_number}</StyledTableCell>
                        <StyledTableCell>{waybill.status}</StyledTableCell>
                        <StyledTableCell align="center">{startpointAddress}</StyledTableCell>
                        <StyledTableCell align="center">{endpointAddress}</StyledTableCell>
                        <StyledTableCell align="right">
                          <Button variant="text" onClick={() => handleGetCheckpoint(waybill)}>
                            open waybill
                          </Button>
                        </StyledTableCell>
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
          count={waybills.length}
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

export default WaybillTable;
