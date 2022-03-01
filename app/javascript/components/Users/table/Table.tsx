import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Box, Checkbox, FormControlLabel, Switch, TablePagination, Button,
} from '@mui/material';

import axios from 'axios';
import EnhancedTableToolbar from './TableToolbar';
import EnhancedTableHead from './TableHead';
import { Data, Order } from '../../../mixins/initialValues/userList';
import { getComparator, stableSort } from '../../../utils/stableSort';
import httpClient from '../../../api/httpClient';

interface EnhancedTableProps {
  users: any;
  setUser: any;
  userIds: number[];
  setUserId: any;
  setEditUserModal: any;
}

const EnhancedTable: React.FC<EnhancedTableProps> = (props: EnhancedTableProps) => {
  const {
    users, setUser, userIds, setUserId, setEditUserModal,
  } = props;
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('login');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  React.useEffect(() => {
    httpClient.users.getAll().then();
  }, [setUser]);

  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);
  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };
  const isSelected = (name: string) => selected.indexOf(name) !== -1;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
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
    axios.get('/users.json').then((response) => {
      setUser(response.data);
    });
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
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
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
                      </TableCell>
                      <TableCell align="left">{user.login}</TableCell>
                      <TableCell align="left">{user.role?.role_name}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
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
        />
      </div>
    </Box>
  );
};

export default EnhancedTable;
