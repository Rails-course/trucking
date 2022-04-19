import * as React from 'react';
import axios from 'axios';

import {
  Table, TableBody, TableRow, TableContainer, TableHead, Paper, Button,
} from '@mui/material';

import httpClient from '../../api/httpClient';
import { consignmentTable } from '../../constants/consignmentFields';
import { StyledTableCell, StyledTableRow } from '../../utils/style';
import { ConsignmentTableProps } from '../../common/interfaces_types';
import Search from '../Search';

const ConsignmentTable: React.FC<ConsignmentTableProps> = (props: ConsignmentTableProps) => {
  const {
    consignments, setModalGoodsActive, setGoods, setConsID, setWayBillActive,
    setOwners, currentUserRole, setConsWaybillId, setData,
  } = props;
  const componentMounted = React.useRef(true);
  const [searchData, setSearchData] = React.useState();

  let waybillID = null;

  const handleGetGoods = (consignment) => {
    setModalGoodsActive(true);
    setConsID(consignment.id);
    setGoods(consignment.goods)
    if (consignment.hasOwnProperty('waybill')) waybillID = consignment.waybill.id;
    setConsWaybillId(waybillID);
  };

  const openWaybillCreateModal = (id) => {
    const getWaybillData = httpClient.waybill.get_data_waybill(id);
    const getGoodsOwnerNames = httpClient.goods_owner.get_names();
    setConsID(id);
    axios.all([getWaybillData, getGoodsOwnerNames])
      .then(axios.spread((...responses) => {
        setData(responses[0].data);
        setOwners(responses[1].data);
        setWayBillActive(true);
      }));
  };

  React.useEffect(() => {
    httpClient.consignments.getAll()
      .then((response) => { if (componentMounted.current) setConsignment(response.data); });
    return () => {
      componentMounted.current = false;
    };
  }, []);
  
  const consignmentsData = searchData || consignments;

  return (
    <div>
      <Search setData={setSearchData} Data={consignments} searchField={["consignment_seria","consignment_number"]} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {consignmentTable.map((cell) => <StyledTableCell align="center" key={cell.id}>{cell.title}</StyledTableCell>)}
              {currentUserRole === 'manager'
                ? <StyledTableCell align="center">Waybill</StyledTableCell>
                : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {!consignments
              ? (
                <TableRow>
                  <StyledTableCell>No data yet ...</StyledTableCell>
                </TableRow>
              )
              : consignmentsData.map((consignment) => {
                const dispatcherFIO = `${consignment.dispatcher?.second_name} ${consignment.dispatcher?.first_name} ${consignment.dispatcher?.middle_name}`;
                const managerFIO = `${consignment.manager?.second_name} ${consignment.manager?.first_name} ${consignment.manager?.middle_name}`;
                let waybillStatus = null;
                if (consignment.hasOwnProperty('waybill')) waybillStatus = consignment.waybill.status;
                return (
                  <StyledTableRow key={consignment.id}>
                    <StyledTableCell align="center">{consignment.consignment_seria}</StyledTableCell>
                    <StyledTableCell component="th" scope="company" align="center">{consignment.consignment_number}</StyledTableCell>
                    <StyledTableCell align="center" style={{ fontWeight: 'bold' }}>{consignment.status}</StyledTableCell>
                    <StyledTableCell align="center">{dispatcherFIO}</StyledTableCell>
                    <StyledTableCell align="center">{consignment.manager ? managerFIO : "Isn't checked"}</StyledTableCell>
                    <StyledTableCell align="center">{consignment.bundle_seria}</StyledTableCell>
                    <StyledTableCell align="center">{consignment.bundle_number}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Button variant="outlined" onClick={() => handleGetGoods(consignment)}>
                        Goods
                      </Button>
                    </StyledTableCell>
                    {currentUserRole === 'manager'
                      ? (
                        <StyledTableCell align="center">
                          <Button
                            variant="outlined"
                            disabled={!(consignment.status === 'checked' && !waybillStatus)}
                            onClick={() => openWaybillCreateModal(consignment.id)}
                          >
                            Create Waybill
                          </Button>
                        </StyledTableCell>
                      )
                      : null}
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
