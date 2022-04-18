// @ts-ignore
import * as React from 'react';

import {
  TableContainer, Paper, Table, TableHead, TableRow, TableBody, Button,
} from '@mui/material';

import { waybillTableCell } from '../../constants/waybillFields';
import { StyledTableCell, StyledTableRow } from '../../utils/style';
import httpClient from '../../api/httpClient';
import { WaybillTableProps } from '../../common/interfaces_types';
import Search from '../Search';

const WaybillTable: React.FC<WaybillTableProps> = (props: WaybillTableProps) => {
  const {
    waybills, setWaybillModalActive, setWaybillID, setCheckpoints,
  } = props;

  const [searchData, setSearchData] = React.useState();
  const handleGetCheckpoint = (id) => {
    setWaybillModalActive(true);
    setWaybillID(id);
    httpClient.route.get_routes(id).then((response) => setCheckpoints(response.data));
  };
  const waybillsData = searchData || waybills;
  return (
    <div>
      <Search setData={setSearchData} Data={waybills} searchField="status" />

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
              : waybillsData.map((waybill) => (
                <StyledTableRow key={waybill.id}>
                  <StyledTableCell>{waybill.status}</StyledTableCell>
                  <StyledTableCell align="center">{waybill.startpoint}</StyledTableCell>
                  <StyledTableCell align="center">{waybill.endpoint}</StyledTableCell>
                  <StyledTableCell align="center">{waybill.number}</StyledTableCell>
                  <StyledTableCell align="center">{waybill.seria}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Button variant="text" onClick={() => handleGetCheckpoint(waybill.id)}>
                      open waybill
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default WaybillTable;
