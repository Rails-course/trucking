import * as React from 'react';
import { Form, Formik } from 'formik';

import {
  Autocomplete,
  Container,
  Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField,
} from '@mui/material';
import Button from '@mui/material/Button';

import FormikField from '../ui-components/FormikField';
import FormikSelect from '../ui-components/FormikSelect';
import validationSchema from '../mixins/validationSchema';
import { userFields } from '../constants/userFields';
import userInitialValues, { userFormValues, roleItems } from '../initialValues/userInitialValues';
import httpClient from '../api/httpClient';

interface CreateFormProps {
  isActiveModal: boolean;
  handleClose: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props: CreateFormProps) => {
  const [companies, setCompanies] = React.useState(null);
  const {
    isActiveModal, handleClose,
  } = props;

  const handleSubmit = async (user: userFormValues) => { await httpClient.users.create(user); };

  React.useEffect(() => {
    httpClient.companies.get_data().then((response) => {
      setCompanies(response.data);
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
        <DialogTitle>Add User Of Company</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} direction="column">
            <Grid item xs={8}>
              <Formik
                initialValues={userInitialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({
                  dirty, isValid, handleChange, values,
                }) => (
                  <Form>
                    <Container maxWidth="sm">
                      {userFields.map((column) => (
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
                      id="company"
                      options={companies}
                      getOptionLabel={(option) => option['name']}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          onChange={handleChange}
                          margin="normal"
                          label="Company"
                          fullWidth
                          value={values?.company}
                        />
                      )}
                    />
                    <FormikSelect
                      name="role"
                      items={roleItems}
                      label="Role"
                      required
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

export default CreateForm;
