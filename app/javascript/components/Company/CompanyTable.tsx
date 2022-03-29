import * as React from 'react';

import {
  Table, TableBody, TableRow, TableContainer, TableHead, Paper, Button,
} from '@mui/material';

import httpClient from '../../api/httpClient';
import { StyledTableCell, StyledTableRow } from '../../utils/style';
import { CompanyTableProps } from '../../common/interfaces_types';

const CompanyTable: React.FC<CompanyTableProps> = (props: CompanyTableProps) => {
  const { companies, setCompany } = props;

  React.useEffect(() => {
    httpClient.companies.get_data().then((response) => setCompany(response.data));
  }, []);

  const updateData = () => {
    httpClient.companies.get_data().then((response) => setCompany(response.data));
  };

  const deleteCompany = (id) => httpClient.companies.delete(id).then(() => updateData());

  const suspendCompany = (id) => httpClient.companies.suspend(id).then(() => updateData());

  if (!companies) return (<p>No data yet ...</p>);

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
                <StyledTableCell component="th" scope="company">{company.name}</StyledTableCell>
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
