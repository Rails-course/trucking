import * as React from 'react';

import {
  Box, Checkbox, TableHead, TableSortLabel,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

import { UserData } from '../../../mixins/initialValues/userList';
import { headCells } from '../../../constants/usersList';
import { EnhancedHeadTableProps } from '../../../common/interfaces_types';
import { StyledTableCell, StyledTableRow } from '../../../utils/style';

function EnhancedTableHead(props: EnhancedHeadTableProps) {
  const {
    onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort,
  } = props;

  const createSortHandler = (property: keyof UserData) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <StyledTableRow>
        <StyledTableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </StyledTableCell>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              style={{ color: 'white' }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
}

export default EnhancedTableHead;
