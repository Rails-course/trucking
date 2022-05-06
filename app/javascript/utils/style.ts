import {
  alpha, styled, TableCell, tableCellClasses, TableRow,
} from '@mui/material';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#57606f',
    color: theme.palette.common.white,
    fontSize: '1rem',
    textAlign: 'center',
  },
  [`&.${tableCellClasses.body}`]: { fontSize: 17 },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover },
  '&:last-child td, &:last-child th': { border: 0 },
  textAlign: 'center',
}));

export const SearchPanel = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.5),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.9),
  },
  marginLeft: 0,
}));
