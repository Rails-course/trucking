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

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name&nbsp;</StyledTableCell>
              <StyledTableCell align="right" colSpan={1} style={{ width: '30%' }}>Action&nbsp;</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!companies
              ? (
                <TableRow>
                  <StyledTableCell>No data yet ...</StyledTableCell>
                </TableRow>
              )
              : companies.map((company) => (
                <StyledTableRow key={company.name}>
                  <StyledTableCell component="th" scope="company">{company.name}</StyledTableCell>
                  <StyledTableCell align="right" style={{ width: '30%' }}>
                    <Button variant="outlined" color="warning" onClick={() => suspendCompany(company.id)} style={{ marginRight: '10px' }}>
                      {company.status ? 'unsuspend' : 'suspend'}
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => deleteCompany(company.id)}>
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
