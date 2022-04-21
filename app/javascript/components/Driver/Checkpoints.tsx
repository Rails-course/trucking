import * as React from 'react';

import {
  Dialog, DialogContent, DialogTitle, Paper, Button,
  Table, TableBody, TableContainer, TableHead, TableRow,
} from '@mui/material';

import CheckpointWindow from './CheckpointWindow';
import { StyledTableCell, StyledTableRow } from '../../utils/style';
import { CheckpointsFormProps } from '../../common/interfaces_types';
import { checkpointsFields } from '../../constants/checkpoints';

const Checkpoints: React.FC<CheckpointsFormProps> = (props: CheckpointsFormProps) => {
  const {
    id, isWaybillModal, checkpoints, setWaybillModalActive, currentUserRole,
    setAlertText, alertSetOpen, setAlertType, handleSubmitWaybill, formErrorsCheckpoints, setCheckpoints,
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
                {checkpointsFields.map((cell) => <StyledTableCell align="right" key={cell.id}>{cell.title}</StyledTableCell>)}
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
                    <StyledTableCell align="right">{checkpoint.pass_date}</StyledTableCell>
                    <StyledTableCell align="right">
                      <CheckpointWindow
                        id={checkpoint.id}
                        status={checkpoint.is_passed}
                        currentUserRole={currentUserRole}
                        alertSetOpen={alertSetOpen}
                        setAlertType={setAlertType}
                        setAlertText={setAlertText}
                        wayID={id}
                        setCheckpoints={setCheckpoints}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          onClick={() => handleSubmitWaybill(id)}
          disabled={!(currentUserRole === 'driver')}
        >
          Transportation completed
        </Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogContent>
    </Dialog>
  );
};

export default Checkpoints;
