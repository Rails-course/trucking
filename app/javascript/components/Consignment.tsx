import * as React from 'react';

import Button from '@mui/material/Button';
import { Box, Grid } from '@mui/material';

import CreateConsignmentForm from './Consignment/CreateConsignmentForm';
import { consignmentFormValues } from '../initialValues/consignmentInitialValues';
// import { ConsignmentData } from '../mixins/initialValues/consignmentList';
import httpClient from '../api/httpClient';
import ConsignmentTable from './Consignment/ConsigmentTable';
import { goodsFormValues } from '../initialValues/goodsInitialValues';
// import { GoodsData } from '../mixins/initialValues/goodsList';

type UnionConsGoodType = { consignment: consignmentFormValues } | { goods: goodsFormValues }

function Consignment() {
  const [isActiveModal, setModalActive] = React.useState(false);
  const [consignments, setConsignment] = React.useState(null);
  const [goods, setGood] = React.useState([{
    good_name: '', unit_of_measurement: '', quantity: 0,
  }]);

  const handleFieldAdd = () => setGood(
    [...goods, {
      good_name: '', unit_of_measurement: '', quantity: 0,
    }],
  );

  const handleFieldChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...goods];
    list[index][name] = value;
    setGood(list);
  };

  const handleClose = () => setModalActive(false);

  const handleSubmit = (values: UnionConsGoodType) => {
    const requests = [
      httpClient.consignments.create({ values }),
      httpClient.goods.create({ ...values, goods }),
    ];

    Promise.all(requests)
      .then(() => {
        setConsignment((prevConsignment) => [...prevConsignment, values]);
        // setGood(() => [...goods, values]);
      });
  };

  return (
    <div className="wrapper">
      <Box sx={{
        flexGrow: 1, display: 'flex', rowGap: '20px', flexDirection: 'column',
      }}
      >
        <Grid item xs={12}>
          <Button variant="outlined" onClick={() => setModalActive(true)} color="inherit">
            Create Consignment
          </Button>
        </Grid>
        <Grid item xs={12}>
          <ConsignmentTable consignments={consignments} setConsignment={setConsignment} />
        </Grid>
      </Box>
      <CreateConsignmentForm
        isActiveModal={isActiveModal}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        goods={goods}
        handleFieldAdd={handleFieldAdd}
        handleFieldChange={handleFieldChange}
      />
    </div>
  );
}

export default Consignment;
