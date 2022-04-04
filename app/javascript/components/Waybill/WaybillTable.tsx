// @ts-ignore
import * as React from 'react';

// @ts-ignore
import { TableContainer, Paper, Table, TableHead, TableRow, TableBody } from '@mui/material';
import { waybillTableCell } from '../../constants/waybillFields';
import { StyledTableCell, StyledTableRow } from '../../utils/style';
import Checkpoints from '../Driver/Checkpoints';
import WaybillGoods from '../Driver/WaybillGoods';
import httpClient from '../../api/httpClient';

interface WaybillTableProps {
  waybills: any;
  setWaybill: any;
}

const WaybillTable: React.FC<WaybillTableProps> = (props: WaybillTableProps) => {
  const { waybills, setWaybill } = props;

  React.useEffect(() => {
    httpClient.waybill.gets_waybills().then((response) => setWaybill(response.data));
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {waybillTableCell.map((cell) => (
                <StyledTableCell key={cell.id} align={cell.align}>{cell.title}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!waybills
              ? (
                <TableRow>
                  <StyledTableCell>No data yet ...</StyledTableCell>
                </TableRow>
              )
              : waybills.map((waybill) => (
                <StyledTableRow key={waybill.id}>
                  <StyledTableCell>{waybill.status}</StyledTableCell>
                  <StyledTableCell align="center">{waybill.startpoint}</StyledTableCell>
                  <StyledTableCell align="center">{waybill.endpoint}</StyledTableCell>
                  <StyledTableCell align="right"><Checkpoints id={waybill.id} /></StyledTableCell>
                  <StyledTableCell align="right"><WaybillGoods wayId={waybill.id} /></StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default WaybillTable;
