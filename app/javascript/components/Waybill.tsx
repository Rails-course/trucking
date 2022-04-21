import * as React from 'react';

import { Box, Grid } from '@mui/material';

import httpClient from '../api/httpClient';
import WaybillTable from './Waybill/WaybillTable';
import Checkpoints from './Driver/Checkpoints';
import SiteAlerts from './Alert';
import Search from './Search';
import { WaybillProps } from '../common/interfaces_types';

const Waybill: React.FC<WaybillProps> = (props: WaybillProps) => {
  const { currentUserRole } = props;
  const [waybills, setWaybill] = React.useState([]);
  const [isWaybillModal, setWaybillModalActive] = React.useState(false);
  const [waybillID, setWaybillID] = React.useState(null);
  const [checkpoints, setCheckpoints] = React.useState(null);
  const [alertOpen, alertSetOpen] = React.useState(false);
  const [alertType, setAlertType] = React.useState<string>();
  const [alertText, setAlertText] = React.useState<string>();
  const componentMounted = React.useRef(true);
  const [formErrorsCheckpoints, setFormErrorsCheckpoints] = React.useState([]);
  const [searchData, setSearchData] = React.useState();

  React.useEffect(() => {
    httpClient.waybill.gets_waybills().then((response) => {
      if (componentMounted.current) {
        const waybillsOrder = ['transportation started', 'delivered to the recipient'];
        setWaybill(response.data
          .sort((a, b) => waybillsOrder.indexOf(a.status) - waybillsOrder.indexOf(b.status)));
      }
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
          justifyContent="flex-end"
        >
          <Grid item md={3} style={{ textAlign: 'left' }}>
            <Search setData={setSearchData} Data={waybills} searchField="status" />
          </Grid>
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
        handleSubmitWaybill={handleSubmitWaybill}
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
