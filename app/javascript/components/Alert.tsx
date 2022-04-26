import * as React from 'react';

import { Alert, AlertProps, Snackbar } from '@mui/material';

import { SiteAlertProps } from '../common/interfaces_types';

const SnackbarAlert = React.forwardRef<HTMLDivElement, AlertProps>(
  (props, ref) => <Alert elevation={6} ref={ref} {...props} />,
);

const SiteAlerts: React.FC<SiteAlertProps> = (props: SiteAlertProps) => {
  const { alert, setAlert } = props;

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({ type: alert.type, text: alert.text, open: false });
  };

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={2500}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      onClose={handleClose}
    >
      <SnackbarAlert severity={alert.type} onClose={handleClose}>{alert.text}</SnackbarAlert>
    </Snackbar>
  );
};

export default SiteAlerts;
