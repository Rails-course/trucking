import * as React from 'react';

import {
  Table, TableBody, TableRow, TableContainer, TableHead, Paper, Button,
} from '@mui/material';

import httpClient from '../../api/httpClient';
import { consignmentTable } from '../../constants/consignmentFields';
import { StyledTableCell, StyledTableRow } from '../../utils/style';
import { ConsignmentTableProps } from '../../common/interfaces_types';
import axios from 'axios';

const ConsignmentTable: React.FC<ConsignmentTableProps> = (props: ConsignmentTableProps) => {
  const {
    consignments, setModalGoodsActive, setGoods, setConsID, setWayBillActive,
    setConsignment, setOwners, setData, currentUserRole
  } = props;
  const componentMounted = React.useRef(true);

  const handleGetGoods = (id) => {
    setModalGoodsActive(true);
    setConsID(id);
    httpClient.goods.getConsignmentGoods(id).then((response) => setGoods(response.data));
  };

  const openWaybillCreateModal = (id) => {
    const getWaybillData = httpClient.waybill.get_data_waybill(id);
    const getGoodsOwnerNames = httpClient.goods_owner.get_names();
    setConsID(id);
    axios.all([getWaybillData, getGoodsOwnerNames])
      .then(axios.spread((...responses) => {
        setData(responses[0].data)
        setOwners(responses[1].data)
        setWayBillActive(true);
      })
      )
  };

  React.useEffect(() => {
    httpClient.consignments.getAll()
      .then((response) => { if (componentMounted.current) setConsignment(response.data); });
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
              {consignmentTable.map((cell) => <StyledTableCell align="center" key={cell.id}>{cell.title}</StyledTableCell>)}
              {currentUserRole === 'manager' ?
                <StyledTableCell align="center">Waybill</StyledTableCell>
                : null
              }
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
                  <StyledTableRow key={consignment.id}>
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
                    <StyledTableCell align="center">{dispatcherFIO}</StyledTableCell>
                    <StyledTableCell align="center">{consignment.manager ? managerFIO : "Isn't checked"}</StyledTableCell>
                    {currentUserRole === 'manager' ?
                      <StyledTableCell align="center">
                        <Button
                          variant="outlined"
                          disabled={!(consignment.status === 'checked' && !waybillStatus)}
                          onClick={() => openWaybillCreateModal(consignment.id)}
                        >
                          Create Waybill
                        </Button>
                      </StyledTableCell>
                      : null
                    }
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
