import * as React from 'react';

import { Box, Grid } from '@mui/material';

import httpClient from '../api/httpClient';
import WaybillTable from './Waybill/WaybillTable';
import Checkpoints from './Driver/Checkpoints';
import SiteAlerts from './Alert';
import Search from './Search';
import { WaybillProps } from '../common/interfaces_types';

const Waybill: React.FC<WaybillProps> = (props: WaybillProps) => {
  const { currentUserRole, waybillsJSON } = props;
  const [isWaybillModal, setWaybillModalActive] = React.useState(false);
  const [waybillID, setWaybillID] = React.useState(null);
  const [checkpoints, setCheckpoints] = React.useState(null);
  const [formErrorsCheckpoints, setFormErrorsCheckpoints] = React.useState([]);
  const [searchData, setSearchData] = React.useState();
  const [alert, setAlert] = React.useState({ text: '', type: '', open: false });

  const waybillsOrder = ['transportation started', 'delivered to the recipient'];
  const [waybills, setWaybill] = React.useState((waybillsJSON)
    .sort((a, b) => waybillsOrder.indexOf(a.status) - waybillsOrder.indexOf(b.status)));

  const handleSubmitWaybill = (id) => {
    httpClient.waybill.finish({ ids: id })
      .then((response) => {
        const newWaybills = waybills;
        newWaybills.find((waybill) => waybill.id === id).status = response.data.status;
        setWaybill(newWaybills);
        setAlert({ text: 'Successfully finished cargo transportation!', type: 'success', open: true });
      })
      .catch((error) => {
        setFormErrorsCheckpoints(error.response.data);
        setAlert({ text: 'Couldn\'t complete the trip!', type: 'error', open: true });
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
            <Search setData={setSearchData} Data={waybills} />
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
        setAlert={setAlert}
        handleSubmitWaybill={handleSubmitWaybill}
        formErrorsCheckpoints={formErrorsCheckpoints}
        setCheckpoints={setCheckpoints}
      />
      <SiteAlerts alert={alert} />
    </div>
  );
};

export default Waybill;
