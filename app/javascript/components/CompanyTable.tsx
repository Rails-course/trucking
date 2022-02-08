import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 17,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
interface ClientTableProps {
    company_data?: any[]
}

export default function CompanyTable({company_data}: ClientTableProps) {

    return (<div >
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Name&nbsp;</StyledTableCell>
                    <StyledTableCell align="right" colspan="2">Action&nbsp;</StyledTableCell></TableRow>
                </TableHead>
                <TableBody>
                    {company_data.map((company) => (
                        <StyledTableRow key={company.name}>
                            <StyledTableCell component="th" scope="company">
                                {company.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">delete</StyledTableCell>
                            <StyledTableCell align="right">some action</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer></div>
    );
}