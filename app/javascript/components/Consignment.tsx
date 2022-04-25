import * as React from 'react';

import { Box, Grid, Button } from '@mui/material';

import CreateConsignmentForm from './Consignment/CreateConsignmentForm';
import ConsignmentGoods from './Consignment/ConsignmentGoods';
import ConsignmentTable from './Consignment/ConsigmentTable';
import httpClient from '../api/httpClient';
import { ConsignmentProps, Item } from '../common/interfaces_types';
import CreateWaybill from './Waybill/CreateWaybill';
import SiteAlerts from './Alert';
import { consignmentFormValues } from '../initialValues/consignmentInitialValues';
import Search from './Search';

const Consignment: React.FC<ConsignmentProps> = (props: ConsignmentProps) => {
  const { currentUserRole, consignmentsJSON } = props;
  const [isActiveModal, setModalActive] = React.useState(false);
  const [isActiveGoodsModal, setModalGoodsActive] = React.useState(false);
  const [isActiveWayBill, setWayBillActive] = React.useState(false);
  const [formErrors, setFormErrors] = React.useState([]);
  const [alertOpen, alertSetOpen] = React.useState<boolean>(false);
  const [alertType, setAlertType] = React.useState<string>();
  const [alertText, setAlertText] = React.useState<string>();
  const [searchData, setSearchData] = React.useState();

  const consignmentsOrder = ['registered', 'checked', 'delivered'];
  const [consignments, setConsignment] = React.useState(
    JSON.parse(consignmentsJSON)
      .sort((a, b) => consignmentsOrder.indexOf(a.status) - consignmentsOrder.indexOf(b.status)),
  );

  const [goods, setGoods] = React.useState([]);
  const [checkedGoods, setCheckedGoods] = React.useState<Item[]>([]);
  const [consId, setConsID] = React.useState(null);
  const [data, setData] = React.useState(null);
  const [owners, setOwners] = React.useState([]);
  const [consWaybillId, setConsWaybillId] = React.useState(null);
  const [titleStatus, setTitleStatus] = React.useState(null);
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
    // TODO: refactor reseting goods state on close and after submit
    // handleClose works before handleGoodsSubmit, so we cant just reset state on handleClose
    setTimeout(() => {
      setCheckedGoods([]);
    }, 1000)
  };

  const handleSubmit = (consignment: consignmentFormValues) => {
    httpClient.consignments.create({ consignment, newGoods })
      .then((response) => {
        setConsignment((prevConsignment) => [...prevConsignment, response.data]);
        setModalActive(false);
        setAlertType('success');
        setAlertText('Successfully created consignment with goods!');
        alertSetOpen(true);
        setTimeout(() => {
          alertSetOpen(false);
        }, 5000);
      })
      .catch((errors) => {
        setFormErrors(errors.response.data);
        setAlertType('error');
        setAlertText('Something went wrong with creating consignment or goods');
        alertSetOpen(true);
        setTimeout(() => {
          alertSetOpen(false);
        }, 5000);
      });
  };

  const handleGoodsSubmit = () => {
    const checkedGoodsIds = checkedGoods.map((checkedGood) => checkedGood.id);
    switch (titleStatus) {
      case 'Checked':
        setTitleStatus('');
        return httpClient.goods.setConsignmentGoodsChecked(consId, { checkedGoodsIds })
          .then((response) => {
            const objIndex = consignments.findIndex((element) => element.id === consId);
            consignments[objIndex] = response.data;
            setConsignment(consignments);
            setModalActive(false);
            setAlertType('info');
            setAlertText('Goods status changed!');
            alertSetOpen(true);
            setTimeout(() => {
              alertSetOpen(false);
            }, 5000);
          });
      case 'Delivered':
        setTitleStatus('');
        return httpClient.goods.setWaybillGoodsStatus(consWaybillId, { checkedGoodsIds })
          .then((response) => {
            const objIndex = consignments.findIndex((element) => element.id === consId);
            consignments[objIndex] = response.data;
            setConsignment(consignments);
            setModalActive(false);
            setAlertType('info');
            setAlertText('Goods status changed!');
            alertSetOpen(true);
            setTimeout(() => {
              alertSetOpen(false);
            }, 5000);
          });
    }
  };

  return (
    <div className="wrapper">
      <Box sx={{
        flexGrow: 1, display: 'flex', rowGap: '20px', flexDirection: 'column',
      }}
      >
        <Grid
          container
          rowSpacing={3}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          justifyContent="flex-end"
        >
          <Grid item md={2} style={{ textAlign: 'left' }}>
            <Search setData={setSearchData} Data={consignments} keyField="dispatcher" />
          </Grid>
          {currentUserRole === 'dispatcher'
            ? (
              <Grid item xs={1.75} style={{ textAlign: 'right' }}>
                <Button variant="contained" color="success" size="large" style={{ height: '51px' }} onClick={() => setModalActive(true)}>
                  Create Consignment
                </Button>
              </Grid>
            )
            : null}

          <Grid item xs={12}>
            <ConsignmentTable
              consignments={consignments}
              setModalGoodsActive={setModalGoodsActive}
              setConsID={setConsID}
              setGoods={setGoods}
              setWayBillActive={setWayBillActive}
              formErrors={formErrors}
              setData={setData}
              setOwners={setOwners}
              currentUserRole={currentUserRole}
              setConsWaybillId={setConsWaybillId}
              searchData={searchData}
            />
          </Grid>
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
        setCheckedGoods={setCheckedGoods}
        handleGoodsSubmit={handleGoodsSubmit}
        currentUserRole={currentUserRole}
        titleStatus={titleStatus}
        setTitleStatus={setTitleStatus}
      />
      <CreateWaybill
        id={consId}
        isActiveWayBill={isActiveWayBill}
        setWayBillActive={setWayBillActive}
        data={data}
        handleClose={handleClose}
        owners={owners}
        formWaybillErrors={formErrors}
        alertSetOpen={alertSetOpen}
        setAlertType={setAlertType}
        consignments={consignments}
        setConsignment={setConsignment}
        setAlertText={setAlertText}
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

export default Consignment;
