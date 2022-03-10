import * as React from 'react';
import { Form, Formik } from 'formik';

import {
  Autocomplete,
  Container,
  Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField,
} from '@mui/material';
import Button from '@mui/material/Button';

import FormikField from '../UI/FormikField';
import { consignmentFields } from '../constants/consignmentFields';
import consignmentInitialValues, { consignmentFormValues } from '../initialValues/consignmentInitialValues';
import httpClient from '../api/httpClient';

interface CreateConsignmentFormProps {
  isActiveModal: boolean;
  handleClose: () => void;
}

const CreateConsignmentForm: React.FC<CreateConsignmentFormProps> = (props: CreateConsignmentFormProps) => {

  const [drivers, setDrivers] = React.useState(null);
  const [trucks, setTrucks] = React.useState(null);

  const {
    isActiveModal, handleClose,
  } = props;

  const handleSubmit = async (consignment: consignmentFormValues) => {
    await httpClient.consignments.create(consignment);
  };

  React.useEffect(() => {
    httpClient.trucks.get_trucks().then((response) => {
      setTrucks(response.data);
    });
  }, []);

  React.useEffect(() => {
    httpClient.users.get_drivers().then((response) => {
      setDrivers(response.data);
    });
  }, []);

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
                {({ dirty, isValid, handleChange, values }) => (
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
                    </Container>
                    <Autocomplete
                      id="driver"
                      options={drivers}
                      getOptionLabel={(option) => option['first_name']}
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
                      getOptionLabel={(option) => option['truck_number']}
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
