import * as React from 'react';

import {
  Table, TableBody, TableContainer, Paper, Box,
  Checkbox, FormControlLabel, Switch, TablePagination, Button, TableRow,
} from '@mui/material';

import EnhancedTableToolbar from './TableToolbar';
import EnhancedTableHead from './TableHead';
import { UserData, Order } from '../../../mixins/initialValues/userList';
import { getComparator, stableSort } from '../../../utils/stableSort';
import { EnhancedTableProps } from '../../../common/interfaces_types';
import { StyledTableCell, StyledTableRow } from '../../../utils/style';

const EnhancedTable: React.FC<EnhancedTableProps> = (props: EnhancedTableProps) => {
  const {
    users, setUser, setEditUserModal, setUpdateModalActive, searchData,
  } = props;

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof UserData>('login');
  const [selectedUsersIds, setSelectedUsersIds] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof UserData,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelectedUsersIds = users.map((user) => user.id);
      setSelectedUsersIds(newSelectedUsersIds);
      return;
    }
    setSelectedUsersIds([]);
  };

  const handleToggle = (userID: number) => {
    if (selectedUsersIds.indexOf(userID) === -1) {
      setSelectedUsersIds([...selectedUsersIds, userID]);
    } else {
      setSelectedUsersIds(selectedUsersIds.filter((item) => item !== userID));
    }
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openUpdateModal = (id) => {
    setEditUserModal(id);
    setUpdateModalActive(true);
  };

  const UsersData = searchData || users;

  if (!users) { return (<p>Loading...</p>); }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selectedUsersIds.length}
          users={UsersData}
          setUser={setUser}
          selectedUsersIds={selectedUsersIds}
          setSelectedUsersIds={selectedUsersIds}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selectedUsersIds.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={UsersData.length}
            />
            <TableBody>
              {stableSort(UsersData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => {
                  const name = `${user.first_name} ${user.middle_name} ${user.second_name}`;
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={user.id}
                    >
                      <StyledTableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={selectedUsersIds.indexOf(+user.id) !== -1}
                          onClick={() => handleToggle(+user.id)}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <Button
                          variant="text"
                          onClick={() => { openUpdateModal(user.id); }}
                        >
                          {name}
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell align="left">{user.login}</StyledTableCell>
                      <StyledTableCell align="left">{user.role?.role_name}</StyledTableCell>
                    </TableRow>
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
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
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

export default EnhancedTable;
