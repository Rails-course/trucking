import * as React from 'react';

import {
  Table, TableBody, TableRow, TableContainer, TableHead, Paper,
} from '@mui/material';

import httpClient from '../../api/httpClient';
import { WriteOffActTableProps } from '../../common/interfaces_types';
import { StyledTableCell, StyledTableRow } from '../../utils/style';
import { writeOffActTableCell } from '../../constants/writeOffActFields';

const WriteOffActTable: React.FC<WriteOffActTableProps> = (props: WriteOffActTableProps) => {
  const { writeOffActs, setWriteOffActs } = props;

  React.useEffect(() => {
    httpClient.writeOffActs.getAll().then((response) => setWriteOffActs(response.data));
  }, []);

  if (!writeOffActs) return (<p>No data yet...</p>);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {writeOffActTableCell.map((cell) => (
                <StyledTableCell key={cell.id} align={cell.align}>{cell.title}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {writeOffActs.map((writeOffAct) => (
              <StyledTableRow key={writeOffAct.id}>
                <StyledTableCell component="th" scope="company">{writeOffAct.good_name}</StyledTableCell>
                <StyledTableCell align="right">{writeOffAct.lost_quantity}</StyledTableCell>
                <StyledTableCell align="right">{writeOffAct.consignment.bundle_seria}</StyledTableCell>
                <StyledTableCell align="right">{writeOffAct.consignment.bundle_number}</StyledTableCell>
                <StyledTableCell align="right">{writeOffAct.description}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default WriteOffActTable;
