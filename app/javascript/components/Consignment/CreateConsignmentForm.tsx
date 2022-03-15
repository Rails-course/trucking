import * as React from 'react';
import { Form, Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';

import {
  Autocomplete,
  Container,
  Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField,
} from '@mui/material';
import Button from '@mui/material/Button';

import FormikField from '../../UI/FormikField';
import { consignmentFields } from '../../constants/consignmentFields';
import consignmentInitialValues from '../../initialValues/consignmentInitialValues';
import httpClient from '../../api/httpClient';

interface CreateConsignmentFormProps {
  isActiveModal: boolean;
  handleClose: () => void;
  handleSubmit: any;
}

const CreateConsignmentForm:
  React.FC<CreateConsignmentFormProps> = (props: CreateConsignmentFormProps) => {
    const { isActiveModal, handleClose, handleSubmit } = props;

    const [drivers, setDrivers] = React.useState(null);
    const [trucks, setTrucks] = React.useState(null);
    const [fieldList, setFieldList] = React.useState([{ good_name: '', unit_of_measurement: '', quantity: 0 }]);

    React.useEffect(() => {
      httpClient.trucks.get_trucks().then((response) => setTrucks(response.data));
      httpClient.users.get_drivers().then((response) => setDrivers(response.data));
    }, []);

    const handleFieldAdd = () => setFieldList([...fieldList, { good_name: '', unit_of_measurement: '', quantity: 0 }]);

    const handleFieldChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...fieldList];
      list[index][name] = value;
      setFieldList(list);
    };

    return (
      <div>
        <Dialog
          open={isActiveModal}
          onClose={handleClose}
          sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 535 } }}
          maxWidth="xs"
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
                      <Container maxWidth="sm">
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
                        {fieldList.map((singleField, index) => (
                          <div key={index}>
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
                            {fieldList.length - 1 === index && fieldList.length < 4
                              && <Button variant="outlined" onClick={handleFieldAdd} fullWidth>Add product</Button>}
                          </div>
                        ))}
                      </Container>
                      <Autocomplete
                        id="driver"
                        options={drivers}
                        getOptionLabel={(option) => `${option.second_name} ${option.first_name} ${option.middle_name}`}
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
                        getOptionLabel={(option) => option.truck_number}
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
