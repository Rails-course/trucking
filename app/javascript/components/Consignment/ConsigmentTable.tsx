import * as React from 'react';

import {
  Table, TableBody, TableRow, TableContainer, TableHead, Paper, Button,
} from '@mui/material';

import httpClient from '../../api/httpClient';
import CreateWaybill from '../Waybill/CreateWaybill';
import { consignmentTable } from '../../constants/consignmentFields';
import { StyledTableCell, StyledTableRow } from '../../utils/style';
import { ConsignmentTableProps } from '../../common/interfaces_types';

const ConsignmentTable: React.FC<ConsignmentTableProps> = (props: ConsignmentTableProps) => {
  const {
    consignments, setModalGoodsActive, setGoods, setConsID, formErrors, setConsignment,
  } = props;

  const handleGetGoods = (id) => {
    setModalGoodsActive(true);
    setConsID(id);
    httpClient.goods.getConsignmentGoods(id).then((response) => setGoods(response.data));
  };

  React.useEffect(() => {
    httpClient.consignments.getAll().then((response) => setConsignment(response.data));
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {consignmentTable.map((cell) => <StyledTableCell align="center" key={cell.id}>{cell.title}</StyledTableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {!consignments
              ? (
                <TableRow>
                  <StyledTableCell>No data yet ...</StyledTableCell>
                </TableRow>
              )
              : consignments.map((consignment) => {
                const dispatcherFIO = `${consignment.dispatcher?.second_name} ${consignment.dispatcher?.first_name} ${consignment.dispatcher?.middle_name}`;
                const managerFIO = `${consignment.manager?.second_name} ${consignment.manager?.first_name} ${consignment.manager?.middle_name}`;
                let waybillStatus = null;
                if (consignment.hasOwnProperty('waybill')) waybillStatus = consignment.waybill.status;
                return (
                  <StyledTableRow key={consignment.consignment_number}>
                    <StyledTableCell align="center">{consignment.consignment_seria}</StyledTableCell>
                    <StyledTableCell component="th" scope="company" align="center">{consignment.consignment_number}</StyledTableCell>
                    <StyledTableCell align="center">{consignment.status}</StyledTableCell>
                    <StyledTableCell align="center">{consignment.bundle_seria}</StyledTableCell>
                    <StyledTableCell align="center">{consignment.bundle_number}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Button variant="outlined" onClick={() => handleGetGoods(consignment.id)}>
                        Goods
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <CreateWaybill
                        id={consignment.id}
                        status={consignment.status}
                        waybillStatus={waybillStatus}
                        formWaybillErrors={formErrors}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center">{dispatcherFIO}</StyledTableCell>
                    <StyledTableCell align="center">{consignment.manager ? managerFIO : "Isn't checked"}</StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ConsignmentTable;
