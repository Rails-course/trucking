import * as React from 'react';

import Button from '@mui/material/Button';
import { Box, Grid } from '@mui/material';

import CreateConsignmentForm from './Consignment/CreateConsignmentForm';
import { consignmentFormValues } from '../initialValues/consignmentInitialValues';
import httpClient from '../api/httpClient';
import ConsignmentTable from './Consignment/ConsigmentTable';
import { goodsFormValues } from '../initialValues/goodsInitialValues';
import ConsignmentGoods from './Consignment/ConsignmentGoods';

type UnionConsGoodType = { consignment: consignmentFormValues } | { goods: goodsFormValues }

function Consignment() {
  const [isActiveModal, setModalActive] = React.useState(false);
  const [isActiveGoodsModal, setModalGoodsActive] = React.useState(false);
  const [consignments, setConsignment] = React.useState(null);
  const [goods, setGoods] = React.useState([]);
  const [consId, setConsID] = React.useState(null);
  const [newGoods, setNewGood] = React.useState([{
    good_name: '', unit_of_measurement: '', quantity: 0,
  }]);

  const handleFieldAdd = () => setNewGood([...newGoods, { good_name: '', unit_of_measurement: '', quantity: 0 }]);

  const handleFieldChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...newGoods];
    list[index][name] = value;
    setNewGood(list);
  };

  const handleClose = () => {
    setModalActive(false);
    setModalGoodsActive(false);
  };

  const handleSubmit = (values: UnionConsGoodType) => {
    httpClient.consignments.create({ values }).then((response) => {
      setConsignment((prevConsignment) => [...prevConsignment, response.data]);
    });
    httpClient.goods.create({ ...values, newGoods });
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
          <ConsignmentTable
            consignments={consignments}
            setConsignment={setConsignment}
            setModalGoodsActive={setModalGoodsActive}
            setConsID={setConsID}
            setGoods={setGoods}
            consId={consId}
          />
        </Grid>
      </Box>
      <CreateConsignmentForm
        isActiveModal={isActiveModal}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        newGoods={newGoods}
        handleFieldAdd={handleFieldAdd}
        handleFieldChange={handleFieldChange}
      />
      <ConsignmentGoods
        isActiveModal={isActiveGoodsModal}
        handleClose={handleClose}
        consId={consId}
        goods={goods}
      />
    </div>
  );
}

export default Consignment;
