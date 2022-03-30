import { useState } from 'react';
import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Table, TableBody, TableCell, tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import httpClients from '../../api/httpClient';
import CheckpointWindow from './CheckpointWindow';

interface CheckpointsFormProps {
  id:number,
}
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

const Checkpoints:React.FC <CheckpointsFormProps> = (props: CheckpointsFormProps) => {
  const { id } = props;
  const [checkpoints, setcheckpoints] = useState(null);
  const [isActiveRoutes, setActiveRoutes] = useState(false);

  React.useEffect(() => {
    httpClients.route.get_routes(id).then((response) => {
      setcheckpoints(response.data); console.log(response.data);
    });
  }, []);

  const updateData = () => {
    httpClients.route.get_routes(id).then((response) => {
      setcheckpoints(response.data);
    });
  };
  const submit = () => {
    httpClients.waybill.finish({ ids: id });
    setActiveRoutes(false);
  };
  if (!checkpoints) return (<p>Loading...</p>);
  return (
    <>
      <Button onClick={() => { setActiveRoutes(true); }}>
        Open waybill
      </Button>
      <Dialog
        open={isActiveRoutes}
        onClose={() => {
          setActiveRoutes(false);
        }}
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
                    <StyledTableCell align="right">
                      {checkpoint.city}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {checkpoint.is_passed ? 'passed' : 'not passed'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <CheckpointWindow
                        id={checkpoint.id}
                        status={checkpoint.is_passed}
                        update_data={updateData}
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
          <Button type="submit" onClick={() => { submit(); }}>Transportation completed</Button>
          <Button onClick={() => { setActiveRoutes(false); }}>Close</Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Checkpoints;
