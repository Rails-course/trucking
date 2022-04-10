import * as React from 'react';
import { Collapse, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { SiteAlertProps } from '../common/interfaces_types';

const SiteAlerts: React.FC<SiteAlertProps> = (props: SiteAlertProps) => {
  const {
    alertType, alertText, alertOpen, alertSetOpen,
  } = props;

  return (
    <Collapse in={alertOpen}>
      <Alert
        severity={alertType}
        action={(
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              alertSetOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
          )}
        sx={{ mb: 0 }}
      >
        {alertText}
      </Alert>
    </Collapse>
  );
};

export default SiteAlerts;
