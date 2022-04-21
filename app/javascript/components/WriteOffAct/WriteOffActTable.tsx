import * as React from 'react';

import {
  Table, TableBody, TableRow, TableContainer, TableHead, Paper, TablePagination,
  FormControlLabel, Switch, Box,
} from '@mui/material';

import httpClient from '../../api/httpClient';
import { WriteOffActTableProps } from '../../common/interfaces_types';
import { StyledTableCell, StyledTableRow } from '../../utils/style';
import { writeOffActTableCell } from '../../constants/writeOffActFields';

const WriteOffActTable: React.FC<WriteOffActTableProps> = (props: WriteOffActTableProps) => {
  const { writeOffActs, setWriteOffActs } = props;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [dense, setDense] = React.useState(false);
  const componentMounted = React.useRef(true);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - writeOffActs.length) : 0;

  React.useEffect(() => {
    httpClient.writeOffActs.getAll()
      .then((response) => {
        if (componentMounted.current) {
          setWriteOffActs(response.data);
        }
      });
    return () => {
      componentMounted.current = false;
    };
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 700 }}
            size={dense ? 'small' : 'medium'}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                {writeOffActTableCell.map((cell) => (
                  <StyledTableCell key={cell.id} align="center">{cell.title}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {!writeOffActs
                ? (
                  <TableRow>
                    <StyledTableCell>No data yet ...</StyledTableCell>
                  </TableRow>
                )
                : writeOffActs
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((writeOffAct) => (
                    <StyledTableRow key={writeOffAct.id}>
                      <StyledTableCell align="center" scope="company">{writeOffAct.good_name}</StyledTableCell>
                      <StyledTableCell align="center">{writeOffAct.lost_quantity}</StyledTableCell>
                      <StyledTableCell align="center">{writeOffAct.consignment.bundle_seria}</StyledTableCell>
                      <StyledTableCell align="center">{writeOffAct.consignment.bundle_number}</StyledTableCell>
                      <StyledTableCell align="center">{writeOffAct.description}</StyledTableCell>
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
          count={writeOffActs.length}
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

export default WriteOffActTable;
