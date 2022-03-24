import * as React from 'react';

import { styled } from '@mui/material/styles';
import {
  Table, TableBody, TableCell, TableRow, TableContainer, TableHead, Paper, tableCellClasses,
} from '@mui/material';

import httpClient from '../../api/httpClient';

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

interface WriteOffActTableProps {
  writeOffActs: any,
  setWriteOffActs: any,
}

const WriteOffActTable: React.FC<WriteOffActTableProps> = (props: WriteOffActTableProps) => {
  const { writeOffActs, setWriteOffActs } = props;

  React.useEffect(() => {
    httpClient.writeOffActs.getAll().then((response) => {
      setWriteOffActs(response.data);
    });
  }, []);

  if (!writeOffActs) return (<p>Loading...</p>);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Good name</StyledTableCell>
              <StyledTableCell align="right">Lost quantity</StyledTableCell>
              <StyledTableCell align="right">Bundle seria</StyledTableCell>
              <StyledTableCell align="right">Bundle number</StyledTableCell>
              <StyledTableCell align="right">Description</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {writeOffActs.map((writeOffAct) => {
              return (
                <StyledTableRow key={writeOffAct.id}>
                  <StyledTableCell component="th" scope="company">
                    {writeOffAct.good_name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {writeOffAct.lost_quantity}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {writeOffAct.consignment.bundle_seria}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {writeOffAct.consignment.bundle_number}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {writeOffAct.description}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default WriteOffActTable;
