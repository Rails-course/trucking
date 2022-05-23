import * as React from 'react';

import {
  Checkbox,
  IconButton,
  CircularProgress,
  TableRow,
  TableContainer,
  Paper,
  Table,
  TableHead, TableBody, Button, TablePagination,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import httpClient from '../../api/httpClient';
import { Warehouse, WarehouseTableProps } from '../../common/interfaces_types';
import { warehouseTable } from '../../constants/warehouseFields';
import { StyledTableCell, StyledTableRow } from '../../utils/style';

const WarehouseTable: React.FC<WarehouseTableProps> = (props: WarehouseTableProps) => {
  const {
    warehouses, setWarehouses, setAlertData, currentUserRole, searchData, setSearchData,
    setWarehousesCount, warehousesCount,rowsPerPage,setRowsPerPage
  } = props;

  const [page, setPage] = React.useState<number>(0);


  const handleChangePage = (event: unknown, newPage: number) => {
    httpClient.warehouses.getAll(newPage).then((response) => setWarehouses(response.data)).then(() => setPage(newPage));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const setWarehouseTrusted = (warehouse: Warehouse) => {
    warehouse.trusted = !warehouse.trusted;
    httpClient.warehouses.update(warehouse.id, warehouse).then((response) => {
      const objIndex = warehouses.findIndex((element) => element.id === warehouse.id);
      warehouses[objIndex] = response.data;
      setWarehouses(warehouses);
      if (searchData) setSearchData([response.data]);
      setAlertData({ alertType: 'info', alertText: 'Warehouse successfully set trusted/untrusted', open: true });
    });
  };

  const handleDeleteWarehouse = async (id) => {
    await httpClient.warehouses.delete(id);
    setWarehouses(warehouses.filter((data: Warehouse) => data.id !== id));
    setAlertData({ alertType: 'warning', alertText: 'Warehouse successfully deleted', open: true });
    httpClient.warehouses.getAll(page).then((response) => setWarehouses(response.data))
      .then(() => setWarehousesCount(warehousesCount - 1));
  };

  const handleToggle = (value: Warehouse) => () => setWarehouseTrusted(value);

  const warehousesData = searchData || warehouses;
  return (
    <div>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                {warehouseTable.map((cell) => (
                  <StyledTableCell>
                    {cell.title}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {!warehouses
                ? (
                  <TableRow>
                    <StyledTableCell><CircularProgress color="primary" /></StyledTableCell>
                  </TableRow>
                )
                : warehousesData.map((warehouse) => (
                  <StyledTableRow key={warehouse.id}>
                    <StyledTableCell scope="warehouse">
                      <Button onClick={handleToggle(warehouse)} disabled={!(currentUserRole === 'admin')}>
                        <Checkbox defaultChecked={warehouse.trusted} />
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell scope="company">{warehouse.warehouse_name}</StyledTableCell>
                    <StyledTableCell align="center">
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        disabled={!(currentUserRole === 'admin')}
                        onClick={() => handleDeleteWarehouse(warehouse.id)}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={warehousesCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default WarehouseTable;
