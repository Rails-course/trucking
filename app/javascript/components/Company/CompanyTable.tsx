import * as React from 'react';

import {
  Table, TableBody, TableRow, TableContainer, TableHead, Paper, Button, CircularProgress,
} from '@mui/material';

import httpClient from '../../api/httpClient';
import { StyledTableCell, StyledTableRow } from '../../utils/style';
import { CompanyTableProps } from '../../common/interfaces_types';

const CompanyTable: React.FC<CompanyTableProps> = (props: CompanyTableProps) => {
  const {
    companies, setCompany, setAlertData, searchData, suspendCompany,
  } = props;

  const deleteCompany = (id) => {
    httpClient.companies.delete(id).then(() => {
      setCompany(companies.filter((company) => id !== company.id));
    });
    setAlertData({ alertType: 'success', alertText: 'Company successfully deleted!', open: true });
  };
  const companiesData = searchData || companies;
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
                  <StyledTableCell><CircularProgress color="inherit" /></StyledTableCell>
                </TableRow>
              )
              : companiesData.map((company) => (
                <StyledTableRow key={company.id}>
                  <StyledTableCell component="th" scope="company">{company.name}</StyledTableCell>
                  <StyledTableCell align="center" style={{ width: '30%' }}>
                    <Button
                      variant="outlined"
                      color="warning"
                      onClick={() => (company.is_suspended
                        ? suspendCompany(company.id, 'resumed') : suspendCompany(company.id, 'suspended'))}
                      style={{ marginRight: '10px' }}
                    >
                      {company.is_suspended ? 'resume' : 'suspend'}
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
