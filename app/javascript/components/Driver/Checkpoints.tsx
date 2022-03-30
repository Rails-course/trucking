import * as React from 'react';

import {
  Dialog, DialogContent, DialogTitle, Paper, Button,
  Table, TableBody, TableContainer, TableHead, TableRow,
} from '@mui/material';

import httpClients from '../../api/httpClient';
import CheckpointWindow from './CheckpointWindow';
import { StyledTableCell, StyledTableRow } from '../../utils/style';
import { CheckpointsFormProps } from '../../common/interfaces_types';

const Checkpoints:React.FC <CheckpointsFormProps> = (props: CheckpointsFormProps) => {
  const { id } = props;
  const [checkpoints, setCheckpoints] = React.useState(null);
  const [isActiveRoutes, setActiveRoutes] = React.useState(false);

  React.useEffect(() => {
    httpClients.route.get_routes(id).then((response) => setCheckpoints(response.data));
  }, []);

  const updateData = () => {
    httpClients.route.get_routes(id).then((response) => setCheckpoints(response.data));
  };

  const submit = () => {
    httpClients.waybill.finish({ ids: id });
    setActiveRoutes(false);
  };

  if (!checkpoints) return (<p>No data yet...</p>);

  return (
    <>
      <Button onClick={() => { setActiveRoutes(true); }}>
        Open waybill
      </Button>
      <Dialog
        open={isActiveRoutes}
        onClose={() => setActiveRoutes(false)}
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 535 } }}
        maxWidth="md"
      >
        <DialogTitle>Add checkpoint</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="right">city</StyledTableCell>
                  <StyledTableCell align="right">passed</StyledTableCell>
                  <StyledTableCell align="right">date</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {checkpoints.map((checkpoint) => (
                  <StyledTableRow key={checkpoint.id}>
                    <StyledTableCell align="right">{checkpoint.city}</StyledTableCell>
                    <StyledTableCell align="right">{checkpoint.is_passed ? 'passed' : 'not passed'}</StyledTableCell>
                    <StyledTableCell align="right">
                      <CheckpointWindow
                        id={checkpoint.id}
                        status={checkpoint.is_passed}
                        updateData={updateData}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {checkpoint.pass_date}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button type="submit" onClick={() => submit}>Transportation completed</Button>
          <Button onClick={() => setActiveRoutes(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Checkpoints;
