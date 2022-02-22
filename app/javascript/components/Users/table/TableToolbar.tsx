import * as React from 'react';

import {
  alpha, Button, IconButton, Toolbar, Tooltip, Typography,
} from '@mui/material';

import httpClient from '../../../api/httpClient';

interface EnhancedTableToolbarProps {
    numSelected: number;
    // id: string;
    setUser: any;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  // const { numSelected } = props;
  const { numSelected, setUser } = props;

  const handlerDeleteBtn = (id) => httpClient.users.delete(id).then((res) => setUser(res.data));

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(
            theme.palette.primary.main,
            theme.palette.action.activatedOpacity,
          ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected}
          {' '}
          selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Users of Company
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <Button variant="outlined" color="error" onClick={() => handlerDeleteBtn(numSelected)}>Delete</Button>
          {/* <Button variant="outlined" color="error">Delete</Button> */}
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            {/* eslint-disable-next-line react/jsx-no-undef,no-undef */}
            {/* <FilterListIcon /> */}
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
