import * as React from 'react';
import axios from 'axios';

import { Box, Grid, Button } from '@mui/material';

import CreateConsignmentForm from './Consignment/CreateConsignmentForm';
import ConsignmentGoods from './Consignment/ConsignmentGoods';
import ConsignmentTable from './Consignment/ConsigmentTable';
import httpClient from '../api/httpClient';
import { Item, UnionConsGoodType } from '../common/interfaces_types';
import CreateWaybill from './Waybill/CreateWaybill';

const Consignment = ({ currentUserRole }) => {
  const [isActiveModal, setModalActive] = React.useState(false);
  const [isActiveGoodsModal, setModalGoodsActive] = React.useState(false);
  const [isActiveWayBill, setWayBillActive] = React.useState(false);
  const [consignments, setConsignment] = React.useState(null);
  const [goods, setGoods] = React.useState([]);
  const [formErrors, setFormErrors] = React.useState([]);
  const [checkedGoods, setCheckedGooods] = React.useState<Item[]>([]);
  const [consId, setConsID] = React.useState(null);
  const [data, setData] = React.useState(null);
  const [owners, setOwners] = React.useState([]);
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
    setWayBillActive(false);
    setFormErrors(null);
  };

  const handleSubmit = (values: UnionConsGoodType) => {
    const createConsignment = httpClient.consignments.create({ values });
    const createGoods = httpClient.goods.create({ ...values, newGoods });

    axios.all([createConsignment, createGoods])
      .then(
        axios.spread((...responses) => {
          setConsignment((prevConsignment) => [...prevConsignment, responses[0].data]);
          setModalActive(false);
        }),
      )
      .catch((errors) => {
        setFormErrors(errors.response.data);
      });
  };

  const handleGoodsSubmit = async () => {
    await httpClient.goods.setConsignmentGoodsChecked(consId, checkedGoods).then((response) => {
      const objIndex = consignments.findIndex((element) => element.id === consId);
      consignments[objIndex] = response.data;
      setConsignment(consignments);
    });
    // await httpClient.goods.setWaybillGoodsStatus(consId, checkedGoods).then((response) => {
    //   const objIndex = consignments.findIndex((element) => element.id === consId);
    //   consignments[objIndex] = response.data;
    //   setConsignment(consignments);
    // });
    setCheckedGooods([]);
  };

  return (
    <div className="wrapper">
      <Box sx={{
        flexGrow: 1, display: 'flex', rowGap: '20px', flexDirection: 'column',
      }}
      >
        {currentUserRole === 'dispatcher'
          ? (
            <Grid item xs={12} style={{ textAlign: 'right' }}>
              <Button variant="contained" color="success" size="large" onClick={() => setModalActive(true)}>
                Create Consignment
              </Button>
            </Grid>
          )
          : null}
        <Grid item xs={12}>
          <ConsignmentTable
            consignments={consignments}
            setConsignment={setConsignment}
            setModalGoodsActive={setModalGoodsActive}
            setConsID={setConsID}
            setGoods={setGoods}
            setWayBillActive={setWayBillActive}
            formErrors={formErrors}
            setData={setData}
            setOwners={setOwners}
            currentUserRole={currentUserRole}
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
        formErrors={formErrors}
      />
      <ConsignmentGoods
        isActiveModal={isActiveGoodsModal}
        handleClose={handleClose}
        goods={goods}
        checkedGoods={checkedGoods}
        setCheckedGooods={setCheckedGooods}
        handleGoodsSubmit={handleGoodsSubmit}
        currentUserRole={currentUserRole}
      />
      <CreateWaybill
        id={consId}
        isActiveWayBill={isActiveWayBill}
        setWayBillActive={setWayBillActive}
        data={data}
        handleClose={handleClose}
        owners={owners}
        formWaybillErrors={formErrors}
      />
    </div>
  );
};

export default Consignment;
