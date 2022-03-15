import * as React from 'react';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import httpClients from '../../api/httpClient';

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

interface CompanyTableProps {
  companies: any,
  setCompany: any,
}

const CompanyTable: React.FC<CompanyTableProps> = (props: CompanyTableProps) => {
  const { companies, setCompany } = props;
  React.useEffect(() => {
    httpClients.companies.get_data().then((response) => {
      setCompany(response.data);
    });
  }, []);
  function updateData() {
    httpClients.companies.get_data().then((response) => {
      setCompany(response.data);
    });
  }
  function deleteCompany(id) {
    httpClients.companies.delete(id).then(() => { updateData(); });
  }
  function suspendCompany(id) {
    httpClients.companies.suspend(id).then(() => { updateData(); });
  }
  if (!companies) return null;
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name&nbsp;</StyledTableCell>
              <StyledTableCell align="right" colSpan={2}>Action&nbsp;</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => (
              <StyledTableRow key={company.name}>
                <StyledTableCell component="th" scope="company">
                  {company.name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button variant="outlined" onClick={() => suspendCompany(company.id)}>
                    {company.status ? 'unsuspend' : 'suspend'}
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button variant="outlined" onClick={() => deleteCompany(company.id)}>
                    Delete
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

export default CompanyTable;