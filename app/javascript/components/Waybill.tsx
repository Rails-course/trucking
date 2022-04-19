import * as React from 'react';

import { Box, Grid } from '@mui/material';

import httpClient from '../api/httpClient';
import WaybillTable from './Waybill/WaybillTable';
import Checkpoints from './Driver/Checkpoints';
import SiteAlerts from './Alert';
import Search from './Search';

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
  const [searchData, setSearchData] = React.useState();

  React.useEffect(() => {
    httpClient.waybill.gets_waybills().then((response) => {
      if (componentMounted.current) setWaybill(response.data);
    });
    return () => {
      componentMounted.current = false;
    };
  }, []);
  const handleSubmitWaybill = (id) => {
    httpClient.waybill.finish({ ids: id })
      .then((response) => {
        const newWaybills = waybills;
        newWaybills.find((waybill) => waybill.id === id).status = response.data.status;
        setWaybill(newWaybills);
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
          <Grid item md={3} style={{ textAlign: 'left', marginBottom: '-10px' }}>
            <Search setData={setSearchData} Data={waybills} searchField="status" />
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'right' }} />
          <Grid item xs={12}>
            <WaybillTable
              waybills={waybills}
              setWaybillID={setWaybillID}
              setWaybillModalActive={setWaybillModalActive}
              setCheckpoints={setCheckpoints}
              setWaybill={setWaybill}
              searchData={searchData}
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
        handleSubmit_waybill={handleSubmitWaybill}
        formErrorsCheckpoints={formErrorsCheckpoints}
        setCheckpoints={setCheckpoints}
      />
      <SiteAlerts
        alertType={alertType}
        alertText={alertText}
        alertOpen={alertOpen}
        alertSetOpen={alertSetOpen}
      />
    </div>
  );
};

export default Waybill;
