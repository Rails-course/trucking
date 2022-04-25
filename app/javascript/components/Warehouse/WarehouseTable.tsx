import * as React from 'react';

import {
  List, ListItem, ListItemButton, ListItemText,
  Checkbox, IconButton, ListItemIcon, Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { blue } from '@mui/material/colors';

import httpClient from '../../api/httpClient';
import { WarehouseData, WarehouseTableProps } from '../../common/interfaces_types';
import { warehouseTable } from '../../constants/warehouseFields';

const WarehouseTable: React.FC<WarehouseTableProps> = (props: WarehouseTableProps) => {
  const {
    warehouses, setWarehouses, setAlertType, setAlertText, alertSetOpen, currentUserRole, searchData,
  } = props;
  const componentMounted = React.useRef(true);

  const setWarehouseTrusted = async (warehouse: WarehouseData) => {
    warehouses.splice(warehouses.indexOf(warehouse), 1);
    await httpClient.warehouses.trust(warehouse.id).then((response) => {
      setWarehouses([...warehouses, response.data]);
      setAlertType('info');
      setAlertText('Warehouse successfully set trusted/untrusted');
      alertSetOpen(true);
      setTimeout(() => {
        alertSetOpen(false);
      }, 5000);
    });
  };

  const handleDeleteWarehouse = async (id) => {
    await httpClient.warehouses.delete(id);
    setWarehouses(warehouses.filter((data: WarehouseData) => data.id !== id));
    setAlertType('warning');
    setAlertText('Warehouse successfully deleted');
    alertSetOpen(true);
    setTimeout(() => {
      alertSetOpen(false);
    }, 5000);
  };

  const handleToggle = (value: WarehouseData) => () => setWarehouseTrusted(value);

  React.useEffect(() => {
    httpClient.warehouses.get_all()
      .then((response) => {
        if (componentMounted.current) {
          setWarehouses(response.data);
        }
      });
    return () => {
      componentMounted.current = false;
    };
  }, []);
  const warehousesData = searchData || warehouses;
  if (!warehouses) return (<p>No data found...</p>);

  return (
    <div>
      <List sx={{
        width: '100%', bgcolor: 'background.paper', paddingTop: '0px',
      }}
      >
        <div style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', backgroundColor: '#57606f',
        }}
        >
          {warehouseTable.map((cell) => (
            <Box key={cell.id} component="div" display="inline" p={2} color="#fff">
              {cell.title}
            </Box>
          ))}
        </div>
        {warehousesData.map((value: WarehouseData) => {
          const labelId = `checkbox-list-label-${value}`;
          return (
            <ListItem
              key={value?.id}
              secondaryAction={(
                <IconButton
                  edge="end"
                  aria-label="delete"
                  disabled={!(currentUserRole === 'admin')}
                  onClick={() => handleDeleteWarehouse(value?.id)}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              )}
              disablePadding
              sx={{ width: '95%' }}
            >
              <ListItemButton
                role={undefined}
                onClick={handleToggle(value)}
                dense
                disabled={!(currentUserRole === 'admin')}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={value?.trusted}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                    sx={{
                      color: blue[800],
                      '&.Mui-checked': {
                        color: blue[600],
                      },
                    }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value?.warehouse_name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default WarehouseTable;
