import * as React from 'react';

import {
  Dialog, DialogContent, DialogTitle, Paper, Button,
  Table, TableBody, TableContainer, TableHead, TableRow,
} from '@mui/material';

import CheckpointWindow from './CheckpointWindow';
import { StyledTableCell, StyledTableRow } from '../../utils/style';
import { CheckpointsFormProps } from '../../common/interfaces_types';

const Checkpoints: React.FC<CheckpointsFormProps> = (props: CheckpointsFormProps) => {
  const {
    id, isWaybillModal, checkpoints, setWaybillModalActive, currentUserRole, setAlertText,
    alertSetOpen, setAlertType, handleSubmit_waybill, formErrorsCheckpoints,
    update_checkpoint_status,
  } = props;

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
        {formErrorsCheckpoints ? <p className="error-msg">{formErrorsCheckpoints}</p> : null}
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
                      <CheckpointWindow
                        id={checkpoint.id}
                        status={checkpoint.is_passed}
                        currentUserRole={currentUserRole}
                        alertSetOpen={alertSetOpen}
                        setAlertType={setAlertType}
                        setAlertText={setAlertText}
                        wayID={id}
                        update_checkpoint_status={update_checkpoint_status}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="right">{checkpoint.pass_date}</StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          onClick={() => handleSubmit_waybill(id)}
          disabled={!(currentUserRole === 'driver')}
          color="success"
        >
          Transportation completed
        </Button>
        <Button onClick={handleClose} color="warning">Close</Button>
      </DialogContent>
    </Dialog>
  );
};

export default Checkpoints;
