import {
  styled, TableCell, tableCellClasses, TableRow,
} from '@mui/material';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#57606f',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: { fontSize: 17 },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover },
  '&:last-child td, &:last-child th': { border: 0 },
}));
