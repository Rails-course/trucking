import * as React from 'react';

import { Alert, AlertProps, Snackbar } from '@mui/material';

import { SiteAlertProps } from '../common/interfaces_types';

const SnackbarAlert = React.forwardRef<HTMLDivElement, AlertProps>(
  (props, ref) => <Alert elevation={6} ref={ref} {...props} />,
);

const SiteAlerts: React.FC<SiteAlertProps> = (props: SiteAlertProps) => {
  const {
    alertType, alertText, alertSetOpen, alertOpen,
  } = props;

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    alertSetOpen(false);
  };

  return (
    <Snackbar
      open={alertOpen}
      autoHideDuration={5000}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      onClose={handleClose}
    >
      <SnackbarAlert severity={alertType} onClose={handleClose}>{alertText}</SnackbarAlert>
    </Snackbar>
  );
};

export default SiteAlerts;
