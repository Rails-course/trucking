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
function createData(
    name: string,
    company: string,
) {
    return { name, company};
}
interface ClientTableProps {
    users_data?: any[]
}

export default function ClientTable({users_data}: ClientTableProps) {
    const rows=[]
    for (let i = 0; i < users_data.length; i++){
        rows.push(
            createData(users_data[i].name,'users_data[i].company')
        )
    }
    return (<div >
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name&nbsp;</StyledTableCell>
                            <StyledTableCell align="right">Company&nbsp;</StyledTableCell>
                            <StyledTableCell align="right">Action&nbsp;</StyledTableCell></TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.company}</StyledTableCell>
                                <StyledTableCell align="right">delete</StyledTableCell>
                                <StyledTableCell align="right">some action</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer></div>
    );
}