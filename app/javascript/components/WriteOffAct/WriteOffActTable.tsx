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
  const componentMounted = React.useRef(true);

  React.useEffect(() => {
    httpClient.writeOffActs.getAll()
      .then((response) => {
        if (componentMounted.current) {
          setWriteOffActs(response.data);
        }
      });
    return () => {
      componentMounted.current = false;
    };
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {writeOffActTableCell.map((cell) => (
                <StyledTableCell key={cell.id} align="center">{cell.title}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!writeOffActs
              ? (
                <TableRow>
                  <StyledTableCell>No data yet ...</StyledTableCell>
                </TableRow>
              )
              : writeOffActs.map((writeOffAct) => (
                <StyledTableRow key={writeOffAct.id}>
                  <StyledTableCell align="center" scope="company">{writeOffAct.good_name}</StyledTableCell>
                  <StyledTableCell align="center">{writeOffAct.lost_quantity}</StyledTableCell>
                  <StyledTableCell align="center">{writeOffAct.consignment.bundle_seria}</StyledTableCell>
                  <StyledTableCell align="center">{writeOffAct.consignment.bundle_number}</StyledTableCell>
                  <StyledTableCell align="center">{writeOffAct.description}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default WriteOffActTable;
