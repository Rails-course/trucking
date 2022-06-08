import * as React from 'react';
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableSortLabel,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { statisticsSortTable, statisticsTable } from '../../constants/statisticsField';
import StatisticsAccordion from './StatisticsAccordion';
import { StatisticsType, UserLogs } from '../../common/interfaces_types';
import { Order } from '../../mixins/initialValues/userList';
import { getComparator, stableSort } from '../../utils/stableSort';
import { StyledTableCell, StyledTableRow } from '../../utils/style';

const StatisticsTable: React.FC<StatisticsType> = (props: StatisticsType) => {
  const { userLogs } = props;
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof UserLogs>('username');

  const handleRequestSort = (event, property: keyof UserLogs) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event: React.MouseEvent<unknown>) => {
    handleRequestSort(event, property);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: '700px', width: '100%' }}
          aria-label="statisticsTable"
        >
          <TableHead>
            <StyledTableRow>
              {statisticsSortTable.map((cell) => (
                <StyledTableCell
                  key={cell.id}
                  align={cell.align}
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
                        {order === 'desc'
                          ? 'sorted descending'
                          : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </StyledTableCell>
              ))}
              {statisticsTable.map((cell) => (
                <StyledTableCell key={cell.id} align={cell.align}>
                  {cell.title}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {Object.keys(userLogs).length === 0 ? (
              <StyledTableRow>
                <StyledTableCell color="primary" align="center" colSpan={6}><CircularProgress /></StyledTableCell>
              </StyledTableRow>
            ) : (
              stableSort(userLogs, getComparator(order, orderBy)).map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell align="center">{item.username}</StyledTableCell>
                  <StyledTableCell align="center">{item.data}</StyledTableCell>
                  <StyledTableCell align="center">{item.company}</StyledTableCell>
                  <StyledTableCell align="center">{item.action}</StyledTableCell>
                  <StyledTableCell align="center">{item.type}</StyledTableCell>
                  <StyledTableCell align="center" style={{ width: '45%' }}>
                    <StatisticsAccordion item={item} />
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StatisticsTable;
