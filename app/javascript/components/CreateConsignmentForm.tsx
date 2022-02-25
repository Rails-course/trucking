import * as React from 'react';
import { Form, Formik } from 'formik';

import {
  Autocomplete,
  Container,
  Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField,
} from '@mui/material';
import Button from '@mui/material/Button';

import FormikField from '../ui-components/FormikField';
import { consignmentFields } from '../constants/consignmentFields';
import consignmentInitialValues, { consignmentFormValues } from '../initialValues/consignmentInitialValues';
import httpClient from '../api/httpClient';

interface CreateConsignmentFormProps {
  isActiveModal: boolean;
  handleClose: () => void;
  setConsignment: any,
}

let drivers = [
  { name: "Jhon Doe", passport: "18231873, issued by the police department of the Centralniy district of Homel" },
  { name: "Driver2", passport: "18232323, issued by the police department of the Centralniy district of Homel" }
]
const CreateConsignmentForm: React.FC<CreateConsignmentFormProps> = (props: CreateConsignmentFormProps) => {
  const {
    isActiveModal, handleClose, setConsignment,
  } = props;

  const handleSubmit = async (values) => {
    // await axios.post('/companies/create', values)
    //   .catch((error) => {
    //     console.error('There was an error!', error);
    //   });
    // setTimeout(() => {
    //   axios.get('/companies.json').then((response) => {
    //     setConsignment(response.data);
    //   });
    // }, 100);
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
                      getOptionLabel={(option) => option['name']}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          onChange={handleChange}
                          margin="normal"
                          label="Driver"
                          fullWidth
                          value={values?.driver}
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
