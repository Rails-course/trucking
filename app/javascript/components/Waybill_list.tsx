import * as React from 'react';

import { styled } from '@mui/material/styles';
import {
  Table, TableBody, TableCell, TableRow, TableContainer, TableHead, Paper, tableCellClasses,
} from '@mui/material';

import httpClients from '../api/httpClient';
import {useState} from "react";
import Checkpoints from './driver/Checkpoints'
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


const Waybill_list= () => {
  const[waybills,setWaybill]=useState(null);
  const [isActiveRoutes, setActiveRoutes] = useState(false);

  React.useEffect(() => {
    httpClients.waybill.gets_waybills().then((response) => {
      setWaybill(response.data);console.log(response.data)
    });
  }, []);
  const handleClose = () => {
    setActiveRoutes(false)
  }
  if (!waybills) return (<p>Loadiddng...</p>);
  return (
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Number</StyledTableCell>
                <StyledTableCell align="right">number</StyledTableCell>
                <StyledTableCell align="right">startpoint</StyledTableCell>
                <StyledTableCell align="right">endpoint</StyledTableCell>
                <StyledTableCell align="right">action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {waybills.map((waybill) => {
                return (
                    <StyledTableRow key={waybill.id}>
                      <StyledTableCell align="right">
                        {waybill.startpoint}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {waybill.endpoint}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                       <Checkpoints id={waybill.id} isActiveRoutes={isActiveRoutes} handleClose={handleClose}/>
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

export default Waybill_list;
