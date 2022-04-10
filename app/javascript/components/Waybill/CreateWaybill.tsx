import * as React from 'react';
import { Form, Formik } from 'formik';

import {
  Autocomplete, Box, Container, Button, InputLabel,
  Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField,
} from '@mui/material';

import FormikField from '../../UI/FormikField';
import CreateRoutes from './CreateRoutes';
import RouteTable from './RouteTable';
import httpClient from '../../api/httpClient';
import waybillInitialValues from '../../initialValues/waybillInitianalValue';
import validationWaybill from '../../mixins/validation_schema/waybill';
import { waybillBottomFields, waybillLeftFields, waybillRightFields } from '../../constants/waybillFields';
import { CreateWaybillsFormProps } from '../../common/interfaces_types';

const CreateWaybill: React.FC<CreateWaybillsFormProps> = (props: CreateWaybillsFormProps) => {
  const {
    id, formWaybillErrors, isActiveWayBill, setWayBillActive, handleClose, data, owners,
    alertSetOpen, setAlertType, setAlertText,
  } = props;

  const [isCreateRoutes, setCreateRoutes] = React.useState(false);
  const [routes, setRoutes] = React.useState([]);
  const [formErrors, setFormErrors] = React.useState([]);

  const handleSubmit = (values) => {
    const cityNames = routes.map((name) => name.city_name);
    httpClient.waybill.create(values, cityNames, id)
      .then(() => {
        setWayBillActive(false);
        setAlertType('success');
        setAlertText('Successfully created waybill!');
        alertSetOpen(true);
        setTimeout(() => {
          alertSetOpen(false);
        }, 5000);
      })
      .catch((error) => {
        setFormErrors(error.response.data);
        setAlertType('error');
        setAlertText('Something went wrong with creating waybill!');
        alertSetOpen(true);
        setTimeout(() => {
          alertSetOpen(false);
        }, 5000);
      });
  };

  const closeCreateRoutes = () => setCreateRoutes(false);

  return (
    <div>
      <Dialog
        open={isActiveWayBill}
        onClose={handleClose}
        sx={{ '& .MuiDialog-paper': { width: '100%', maxHeight: 550 } }}
        maxWidth="xs"
      >
        <DialogTitle>Create Waybill</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} direction="column">
            <Grid item xs={12}>
              <Formik
                initialValues={waybillInitialValues}
                onSubmit={handleSubmit}
                validationSchema={validationWaybill}
              >
                {({
                  dirty, isValid, handleChange, values,
                }) => (
                  <Form>
                    <Container maxWidth="xs">
                      {formWaybillErrors ? <p className="error-msg">{formWaybillErrors}</p> : null}
                      <div style={{
                        width: '100%', display: 'flex', justifyContent: 'space-around', textAlign: 'center',
                      }}
                      >
                        <Box
                          component="div"
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          m={1}
                          rowGap="5px"
                          bgcolor="background.paper"
                        >
                          <span><strong>Truck number</strong></span>
                          <span>{data.truck_number}</span>
                        </Box>
                        <Box
                          component="div"
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          m={1}
                          rowGap="5px"
                          bgcolor="background.paper"
                        >
                          <span><strong>Driver</strong></span>
                          <span>{data.driver_fio}</span>
                        </Box>
                      </div>

                      <div style={{ width: '100%', display: 'flex' }}>
                        <Box
                          component="div"
                          display="flex"
                          m={1}
                          flexDirection="column"
                          columnGap="10px"
                          bgcolor="background.paper"
                        >
                          {waybillLeftFields.map((column) => (
                            <FormikField
                              key={column.id}
                              name={column.model}
                              label={column.placeholder}
                              required={column.required}
                              type={column.type}
                              variant="standard"
                            />
                          ))}
                        </Box>
                        <Box
                          component="div"
                          display="flex"
                          m={1}
                          flexDirection="column"
                          columnGap="10px"
                          bgcolor="background.paper"
                        >
                          {waybillRightFields.map((column) => (
                            <FormikField
                              key={column.id}
                              name={column.model}
                              label={column?.placeholder}
                              required={column.required}
                              type={column.type}
                              variant="standard"
                            />
                          ))}
                        </Box>
                      </div>

                      <Autocomplete
                        id="goods_owner"
                        options={owners}
                        getOptionLabel={(option) => option.goods_owner_name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            onSelect={handleChange}
                            margin="normal"
                            label="goods owner"
                            fullWidth
                            value={values?.owner}
                          />
                        )}
                      />
                      <RouteTable routes={routes} />

                      <div style={{
                        display: 'flex', justifyContent: 'space-between', textAlign: 'center', columnGap: '10px', marginTop: '10px',
                      }}
                      >
                        {waybillBottomFields.map((column) => (
                          <div key={column.id}>
                            <InputLabel shrink htmlFor="bootstrap-input">
                              {column.label}
                            </InputLabel>
                            <FormikField
                              key={column.id}
                              name={column.model}
                              label={column.placeholder}
                              required={column.required}
                              type={column.type}
                              variant="outlined"
                            />
                          </div>
                        ))}
                      </div>
                    </Container>

                    <DialogActions style={{ padding: '3px', marginTop: '20px' }}>
                      <Button onClick={() => setCreateRoutes(true)}>create new checkpoints</Button>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button type="submit" disabled={!dirty || !isValid}>Create</Button>
                    </DialogActions>
                  </Form>
                )}
              </Formik>
            </Grid>
            <CreateRoutes
              isActiveModal={isCreateRoutes}
              routeHandleClose={closeCreateRoutes}
              setRoutes={setRoutes}
              routes={routes}
              formErrors={formErrors}
            />
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateWaybill;
