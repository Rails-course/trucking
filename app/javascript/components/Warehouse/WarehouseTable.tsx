import * as React from 'react';
import {
  List, ListItem, ListItemButton, ListItemText, Checkbox, IconButton, ListItemIcon,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { pink } from '@mui/material/colors';
import httpClient from '../../api/httpClient';

interface WarehouseTableProps {
  warehouses: [];
  setWarehouses: any;
}

const WarehouseTable: React.FC<WarehouseTableProps> = (props: WarehouseTableProps) => {
  const { warehouses, setWarehouses } = props;
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleDeleteWarehouse = async (id) => {
    await httpClient.warehouses.delete(id);
    setWarehouses(warehouses.filter((warehouse) => warehouse.id !== id));
  };

  const setWarehouseTrusted = async (id) => {
    await httpClient.warehouses.trust(id);
  };

  if (!warehouses) return (<p>No data found...</p>);

  return (
    <List sx={{
      width: '100%', maxWidth: '70%', bgcolor: 'background.paper',
    }}
    >
      {warehouses.map((value) => {
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
          >
            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  onClick={() => setWarehouseTrusted(value?.id)}
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
  );
};

export default WarehouseTable;
