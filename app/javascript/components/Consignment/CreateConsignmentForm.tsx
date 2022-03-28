import * as React from 'react';
import { Form, Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';

import {
  Autocomplete, Container, Dialog, DialogActions,
  DialogContent, DialogTitle, Grid, TextField, Button, Box,
} from '@mui/material';

import FormikField from '../../UI/FormikField';
import { consignmentFields } from '../../constants/consignmentFields';
import consignmentInitialValues from '../../initialValues/consignmentInitialValues';
import httpClient from '../../api/httpClient';
import { CreateConsignmentFormProps, Driver, Truck } from '../../common/interfaces_types';

const CreateConsignmentForm:
  React.FC<CreateConsignmentFormProps> = (props: CreateConsignmentFormProps) => {
    const {
      isActiveModal, handleClose, handleSubmit, newGoods, handleFieldAdd, handleFieldChange,
    } = props;

    const [drivers, setDrivers] = React.useState(null);
    const [trucks, setTrucks] = React.useState(null);

    React.useEffect(() => {
      httpClient.trucks.get_trucks().then((response) => setTrucks(response.data));
      httpClient.users.get_drivers().then((response) => setDrivers(response.data));
    }, []);

    return (
      <div>
        <Dialog
          open={isActiveModal}
          onClose={handleClose}
          sx={{ '& .MuiDialog-paper': { width: '50%', maxHeight: 663 } }}
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
                        <div style={{
                          width: '100%', display: 'flex', textAlign: 'center', columnGap: '15px',
                        }}
                        >
                          <Box
                            component="div"
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                            bgcolor="background.paper"
                            columnGap="15px"
                          >
                            {newGoods.map((singleField, index) => (
                              <div
                                key={index}
                                style={{
                                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                }}
                              >
                                <div>
                                  <FormikField
                                    id={uuidv4()}
                                    name="good_name"
                                    label="Product name"
                                    type="text"
                                    variant="standard"
                                    value={singleField.good_name}
                                    onChange={(e) => handleFieldChange(e, index)}
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
                                    required
                                  />
                                </div>
                                <div>
                                  {newGoods.length - 1 === index && newGoods.length < 3
                                          && <Button variant="outlined" onClick={handleFieldAdd} fullWidth size="small" style={{ marginLeft: '20px' }}>Add product</Button>}
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
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit" disabled={!dirty || !isValid} onClick={handleClose}>Create</Button>
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
