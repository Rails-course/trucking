import * as React from 'react';

import {
  List, ListItem, ListItemButton, ListItemText,
  Checkbox, IconButton, ListItemIcon, Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { pink } from '@mui/material/colors';

import httpClient from '../../api/httpClient';
import { WarehouseData, WarehouseTableProps } from '../../common/interfaces_types';
import { warehouseTable } from '../../constants/warehouseFields';

const WarehouseTable: React.FC<WarehouseTableProps> = (props: WarehouseTableProps) => {
  const { warehouses, setWarehouses } = props;

  const setWarehouseTrusted = async (warehouse: WarehouseData) => {
    warehouses.splice(warehouses.indexOf(warehouse), 1);
    await httpClient.warehouses.trust(warehouse.id).then((response) => {
      setWarehouses([...warehouses, response.data]);
    });
  };

  const handleDeleteWarehouse = async (id) => {
    await httpClient.warehouses.delete(id);
    setWarehouses(warehouses.filter((data: WarehouseData) => data.id !== id));
  };

  const handleToggle = (value: WarehouseData) => () => setWarehouseTrusted(value);

  if (!warehouses) return (<p>No data found...</p>);

  return (
    <div>
      <List sx={{
        width: '100%', maxWidth: '70%', bgcolor: 'background.paper',
      }}
      >
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          {warehouseTable.map((cell) => (
            <Box key={cell.id} component="div" display="inline" p={1} m={1} bgcolor="background.paper">
              {cell.title}
            </Box>
          ))}
        </div>
        {warehouses.map((value: WarehouseData) => {
          const labelId = `checkbox-list-label-${value}`;
          return (
            <ListItem
              key={value?.id}
              secondaryAction={(
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteWarehouse(value?.id)}
                >
                  <DeleteIcon />
                </IconButton>
              )}
              disablePadding
              sx={{ width: '95%' }}
            >
              <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={value?.trusted}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                    sx={{
                      color: pink[800],
                      '&.Mui-checked': {
                        color: pink[600],
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
