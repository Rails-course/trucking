import * as React from 'react';

import {
  Dialog, DialogContent, DialogTitle, Paper, Button,
  Table, TableBody, TableContainer, TableHead, TableRow,
} from '@mui/material';

import CheckpointWindow from './CheckpointWindow';
import { StyledTableCell, StyledTableRow } from '../../utils/style';
import { CheckpointsFormProps } from '../../common/interfaces_types';
import httpClient from '../../api/httpClient';

const Checkpoints:React.FC <CheckpointsFormProps> = (props: CheckpointsFormProps) => {
  const {
    id, isWaybillModal, checkpoints, setWaybillModalActive,
  } = props;

  const [formErrors, setFormErrors] = React.useState([]);

  const submit = () => {
    httpClient.waybill.finish({ ids: id }).catch((error) => setFormErrors(error.response.data));
  };

  const handleClose = () => setWaybillModalActive(false);

  return (
    <Dialog
      open={isWaybillModal}
      onClose={handleClose}
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 535 } }}
      maxWidth="md"
    >
      <DialogTitle>Add checkpoint</DialogTitle>
      <DialogContent>
        {formErrors ? <p className="error-msg">{formErrors}</p> : null}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="right">city</StyledTableCell>
                <StyledTableCell align="right">passed</StyledTableCell>
                <StyledTableCell align="right">action</StyledTableCell>
                <StyledTableCell align="right">date</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!checkpoints
                ? (
                  <TableRow>
                    <StyledTableCell>No data yet ...</StyledTableCell>
                  </TableRow>
                )
                : checkpoints.map((checkpoint) => (
                  <StyledTableRow key={checkpoint.id}>
                    <StyledTableCell align="right">{checkpoint.city}</StyledTableCell>
                    <StyledTableCell align="right">{checkpoint.is_passed ? 'passed' : 'not passed'}</StyledTableCell>
                    <StyledTableCell align="right">
                      <CheckpointWindow id={checkpoint.id} status={checkpoint.is_passed} />
                    </StyledTableCell>
                    <StyledTableCell align="right">{checkpoint.pass_date}</StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button type="submit" onClick={submit}>Transportation completed</Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogContent>
    </Dialog>
  );
};

export default Checkpoints;
