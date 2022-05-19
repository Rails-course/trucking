import * as React from 'react';

import {
  Table, TableBody, TableRow, TableContainer, TableHead, Paper,
  TablePagination, FormControlLabel, Switch, Box, CircularProgress, TableSortLabel,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

import { statisticsSortTable, statisticsTable } from '../constants/statisticsFields';
import { Order } from '../mixins/initialValues/consignmentList';
import { StyledTableCell, StyledTableRow } from '../utils/style';
import { getComparator, stableSort } from '../utils/stableSort';

const Statistics = () => {
  const user = ['a', 'b', 'c'];
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [dense, setDense] = React.useState<boolean>(false);
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState('name');

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - user.length) : 0;

  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const handleRequestSort = (event, property: keyof []) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event: React.MouseEvent<unknown>) => {
    handleRequestSort(event, property);
  };

  return (
    <div className="wrapper">
      <Box sx={{
        flexGrow: 1, display: 'flex', flexDirection: 'column', maxWidth: '66%',
      }}
      >
        <Paper>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: '700px', tableLayout: 'fixed', width: '100%' }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <TableHead>
                <TableRow>
                  {statisticsSortTable.map((cell) => (
                    <StyledTableCell
                      align="center"
                      key={cell.id}
                      sortDirection={orderBy === cell.id ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === cell.id}
                        direction={orderBy === cell.id ? order : 'asc'}
                        onClick={createSortHandler(cell.id)}
                      >
                        {cell.title}
                        {orderBy === cell.id ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                          </Box>
                        ) : null}
                      </TableSortLabel>
                    </StyledTableCell>
                  ))}
                  {statisticsTable.map((cell) => (
                    <StyledTableCell key={cell.id} align="center">{cell.title}</StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {!user
                  ? (
                    <TableRow>
                      <StyledTableCell><CircularProgress color="primary" /></StyledTableCell>
                    </TableRow>
                  )
                  : stableSort(user, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((u) => (
                      <StyledTableRow key={u.id} tabIndex={-1}>
                        <StyledTableCell align="center">jhjgjgh</StyledTableCell>
                        <StyledTableCell align="center">jhjgjgh</StyledTableCell>
                        <StyledTableCell align="center">jhjgjgh</StyledTableCell>
                        <StyledTableCell align="center">jhjgjgh</StyledTableCell>
                      </StyledTableRow>
                    ))}
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
            count={user.length}
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
    </div>
  );
};

export default Statistics;
