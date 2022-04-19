import * as React from 'react';
import { Form, Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';

import {
  Autocomplete, Container, Dialog, DialogActions,
  DialogContent, DialogTitle, Grid, TextField, Button, Box,
} from '@mui/material';

import axios from 'axios';
import FormikField from '../../UI/FormikField';
import { consignmentFields } from '../../constants/consignmentFields';
import consignmentInitialValues from '../../initialValues/consignmentInitialValues';
import httpClient from '../../api/httpClient';
import { CreateConsignmentFormProps, Driver, Truck } from '../../common/interfaces_types';

const CreateConsignmentForm:
    React.FC<CreateConsignmentFormProps> = (props: CreateConsignmentFormProps) => {
      const {
        isActiveModal, handleClose, handleSubmit, newGoods, handleFieldAdd,
        handleFieldChange, formErrors,
      } = props;

      const [drivers, setDrivers] = React.useState(null);
      const [trucks, setTrucks] = React.useState(null);
      const componentMounted = React.useRef(true);

      React.useEffect(() => {
        const getTrucks = httpClient.trucks.get_trucks();
        const getDrivers = httpClient.users.get_drivers();
        axios.all([getTrucks, getDrivers])
          .then(
            axios.spread((...responses) => {
              if (componentMounted.current) {
                setTrucks(responses[0].data);
                setDrivers(responses[1].data);
              }
            }),
          );
        return () => {
          componentMounted.current = false;
        };
      }, []);

      return (
        <div>
          <Dialog
            open={isActiveModal}
            onClose={handleClose}
            sx={{ '& .MuiDialog-paper': { width: '30%', maxHeight: 663 } }}
            maxWidth="md"
          >
            <DialogTitle>Consignment Form</DialogTitle>
            <DialogContent>
              <Grid container spacing={2} direction="column">
                <Grid item xs={12}>
                  <Formik
                    initialValues={consignmentInitialValues}
                    onSubmit={handleSubmit}
                  >
                    {({
                      dirty, isValid, handleChange, values,
                    }) => (
                      <Form>
                        <Container>
                          {formErrors ? <p className="error-msg">{formErrors}</p> : null}
                          {consignmentFields.map((column) => (
                            <FormikField
                              key={column.id}
                              name={column.model}
                              label={column.placeholder}
                              required={column.required}
                              type={column.type}
                              variant="standard"
                            />
                          ))}
                          <div style={{ width: '100%', display: 'flex' }}>
                            <Box
                              component="div"
                              display="flex"
                              flexDirection="row"
                              alignItems="center"
                              bgcolor="background.paper"
                              flexWrap="wrap-reverse"
                            >
                              {newGoods.map((singleField, index) => (
                                <div
                                  key={index}
                                  style={{
                                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'column', marginTop: '15px', rowGap: '15px',
                                  }}
                                >
                                  <div>
                                    {newGoods.length - 1 === index && newGoods.length < 5
                                                                    && <Button variant="outlined" onClick={handleFieldAdd} fullWidth style={{ marginLeft: '20px' }}>Add product</Button>}
                                  </div>
                                  <div style={{
                                    display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between',
                                  }}
                                  >
                                    <FormikField
                                      id={uuidv4()}
                                      name="good_name"
                                      label="Product name"
                                      type="text"
                                      variant="standard"
                                      value={singleField.good_name}
                                      onChange={(e) => handleFieldChange(e, index)}
                                      style={{ width: '80%', marginRight: '-20px' }}
                                      required
                                    />
                                    <FormikField
                                      id={uuidv4()}
                                      name="unit_of_measurement"
                                      label="Measurement unit"
                                      type="text"
                                      variant="standard"
                                      value={singleField.unit_of_measurement}
                                      onChange={(e) => handleFieldChange(e, index)}
                                      style={{ width: '100%', marginRight: '-18px', marginLeft: '13px' }}
                                      required
                                    />
                                    <FormikField
                                      id={uuidv4()}
                                      name="quantity"
                                      label="Quantity of goods"
                                      type="number"
                                      variant="standard"
                                      value={singleField.quantity}
                                      onChange={(e) => handleFieldChange(e, index)}
                                      style={{ width: '67%', marginRight: '-44px', marginLeft: '50px' }}
                                      required
                                    />
                                  </div>

                                </div>
                              ))}
                            </Box>
                          </div>
                          <Autocomplete
                            id="driver"
                            options={drivers}
                            getOptionLabel={(option: Driver) => `${option.second_name} ${option.first_name} ${option.middle_name}`}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                onSelect={handleChange}
                                margin="normal"
                                label="Driver"
                                fullWidth
                                value={values?.driver}
                              />
                            )}
                          />
                          <Autocomplete
                            id="truck"
                            options={trucks}
                            getOptionLabel={(option: Truck) => option.truck_number}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                onSelect={handleChange}
                                margin="normal"
                                label="Truck"
                                fullWidth
                                value={values?.truck}
                              />
                            )}
                          />
                        </Container>

                        <DialogActions>
                          <Button onClick={handleClose} color="error" variant="outlined">Cancel</Button>
                          <Button type="submit" disabled={!dirty || !isValid} color="success" variant="outlined">Create</Button>
                        </DialogActions>
                      </Form>
                    )}
                  </Formik>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
        </div>
      );
    };

export default CreateConsignmentForm;
