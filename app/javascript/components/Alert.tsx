import * as React from 'react';

import { Alert, AlertProps, Snackbar } from '@mui/material';

import { SiteAlertProps } from '../common/interfaces_types';

const SnackbarAlert = React.forwardRef<HTMLDivElement, AlertProps>(
  (props, ref) => <Alert elevation={6} ref={ref} {...props} />,
);

const SiteAlerts: React.FC<SiteAlertProps> = (props: SiteAlertProps) => {
  const {
    alertData, alertOpen, alertSetOpen,
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
      autoHideDuration={6000}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      onClose={handleClose}
    >
      <SnackbarAlert severity={alertData.alertType} onClose={handleClose}>{alertData.alertText}</SnackbarAlert>
    </Snackbar>
  );
};

export default SiteAlerts;
