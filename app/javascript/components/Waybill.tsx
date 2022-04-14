import * as React from 'react';

import { Box, Grid } from '@mui/material';

import httpClient from '../api/httpClient';
import WaybillTable from './Waybill/WaybillTable';
import Checkpoints from './Driver/Checkpoints';
import SiteAlerts from './Alert';

const Waybill = ({ currentUserRole }) => {
  const [waybills, setWaybill] = React.useState([]);
  const [isWaybillModal, setWaybillModalActive] = React.useState(false);
  const [waybillID, setWaybillID] = React.useState(null);
  const [checkpoints, setCheckpoints] = React.useState(null);
  const [alertOpen, alertSetOpen] = React.useState(false);
  const [alertType, setAlertType] = React.useState('');
  const [alertText, setAlertText] = React.useState('');
  const componentMounted = React.useRef(true);
  const [formErrorsCheckpoints, setFormErrorsCheckpoints] = React.useState([]);

  React.useEffect(() => {
    httpClient.waybill.gets_waybills().then((response) => {
      if (componentMounted.current) setWaybill(response.data);
    });
    return () => {
      componentMounted.current = false;
    };
  }, []);
  const update_checkpoint_status = (id, checkpoint) => {
    const new_checkpoints = checkpoints;
    const target_checkpoint = new_checkpoints.find((checkpoint) => checkpoint.id == id);
    target_checkpoint.is_passed = checkpoint.is_passed ;
    target_checkpoint.pass_date = checkpoint.pass_date ;
    setCheckpoints(new_checkpoints);
  };
  const handleSubmit_waybill = (id) => {
    httpClient.waybill.finish({ ids: id })
      .then((response) => {
        const new_waybills = waybills;
        new_waybills.find((waybill) => waybill.id == id).status = response.data.status;
        setWaybill(new_waybills);
        setAlertType('success');
        setAlertText('Successfully finished cargo transportation!');
        alertSetOpen(true);
        setTimeout(() => {
          alertSetOpen(false);
        }, 5000);
      })
      .catch((error) => {
        setFormErrorsCheckpoints(error.response.data);
        setAlertType('error');
        setAlertText("Couldn't complete the trip!");
        alertSetOpen(true);
        setTimeout(() => {
          alertSetOpen(false);
        }, 5000);
      });
  };
  return (
    <div className="wrapper">
      <Box sx={{
        flexGrow: 1, display: 'flex', flexDirection: 'column', rowGap: '20px', maxWidth: '70%',
      }}
      >
        <Grid
          container
          rowSpacing={3}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={12} style={{ textAlign: 'right' }}>
            <SiteAlerts
              alertType={alertType}
              alertText={alertText}
              alertOpen={alertOpen}
              alertSetOpen={alertSetOpen}
            />
          </Grid>
          <Grid item xs={12}>
            <WaybillTable
              waybills={waybills}
              setWaybillID={setWaybillID}
              setWaybillModalActive={setWaybillModalActive}
              setCheckpoints={setCheckpoints}
              setWaybill={setWaybill}
            />
          </Grid>
        </Grid>
      </Box>
      <Checkpoints
        id={waybillID}
        isWaybillModal={isWaybillModal}
        setWaybillModalActive={setWaybillModalActive}
        checkpoints={checkpoints}
        currentUserRole={currentUserRole}
        alertSetOpen={alertSetOpen}
        setAlertType={setAlertType}
        setAlertText={setAlertText}
        handleSubmit_waybill={handleSubmit_waybill}
        formErrorsCheckpoints={formErrorsCheckpoints}
        update_checkpoint_status={update_checkpoint_status}
      />
    </div>
  );
};

export default Waybill;
