import * as React from 'react';
import axios from 'axios';

import {
  Table, TableBody, TableContainer, Paper, Box,
  Checkbox, FormControlLabel, Switch, TablePagination, Button, TableRow,
} from '@mui/material';

import EnhancedTableToolbar from './TableToolbar';
import EnhancedTableHead from './TableHead';
import { UserData, Order } from '../../../mixins/initialValues/userList';
import { getComparator, stableSort } from '../../../utils/stableSort';
import httpClient from '../../../api/httpClient';
import { EnhancedTableProps } from '../../../common/interfaces_types';
import { StyledTableCell, StyledTableRow } from '../../../utils/style';

const EnhancedTable: React.FC<EnhancedTableProps> = (props: EnhancedTableProps) => {
  const {
    users, setUser, userIds, setUserId, setEditUserModal,
  } = props;

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof UserData>('login');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const componentMounted = React.useRef(true);

  React.useEffect(() => {
    httpClient.users.getAll()
      .then((response) => {
        if (componentMounted.current) setUser(response.data);
      });
    return () => {
      componentMounted.current = false;
    };
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);
  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };
  const isSelected = (name: string) => selected.indexOf(name) !== -1;
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
      const newSelecteds = users.map((n) => `${n.id} ${n.first_name} ${n.middle_name} ${n.second_name}`);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
    setUserId([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string, id: number) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];
    const getId = userIds;
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
      getId.push(id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      userIds.push(id);
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      userIds.push(id);
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
      userIds.push(id);
    }
    setSelected(newSelected);
    setUserId(getId);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    axios.get('/users.json').then((response) => setUser(response.data));
  }, []);

  if (!users) { return (<p>Loading...</p>); }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          users={users}
          setUser={setUser}
          userIds={userIds}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={users.length}
            />
            <TableBody>
              {stableSort(users, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => {
                  const name = `${user.first_name} ${user.middle_name} ${user.second_name}`;
                  const isItemSelected = isSelected(String(name));
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, String(name), +user.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={name}
                      selected={isItemSelected}
                    >
                      <StyledTableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
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
                          onClick={() => setEditUserModal(user.id)}
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
