import * as React from 'react';

import { Alert, AlertProps, Snackbar } from '@mui/material';

import { SiteAlertProps } from '../common/interfaces_types';

const SnackbarAlert = React.forwardRef<HTMLDivElement, AlertProps>(
  (props, ref) => <Alert elevation={6} ref={ref} {...props} />,
);

const SiteAlerts: React.FC<SiteAlertProps> = (props: SiteAlertProps) => {
  const {
    alertData, setAlertData,
  } = props;

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertData({ alertType: alertData.alertType, alertText: alertData.alertText, open: false });
  };

  return (
    <Snackbar
      open={alertData.open}
      autoHideDuration={2500}
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
