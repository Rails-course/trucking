import * as React from 'react';
import { Form, Formik, useFormikContext } from 'formik';

import {
  Autocomplete,
  Container,
  Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField,
} from '@mui/material';
import Button from '@mui/material/Button';

import FormikField from '../../../UI/FormikField';
import FormikSelect from '../../../UI/FormikSelect';
import { userFields } from '../../../constants/userFields';
import httpClient from '../../../api/httpClient';
import userInitialValues, { roleItems } from '../../../initialValues/userInitialValues';
import userValidation from '../../../mixins/validation_schema/user';

interface CreateFormProps {
  isActiveModal: boolean;
  handleClose: () => void;
  editUserModal: any;
  title: string;
  handleSubmit: any;
  btnTitle: string;
}

const CreateForm: React.FC<CreateFormProps> = (props: CreateFormProps) => {
  const [companies, setCompanies] = React.useState(null);
  const {
    isActiveModal, handleClose, handleSubmit, editUserModal,
    title, btnTitle,
  } = props;

  const AutoUpdateForm = ({ id }) => {
    const { setFieldValue } = useFormikContext();

    React.useEffect(() => {
      if (id) {
        httpClient.users.get(id).then(({ data }) => {
          Object.keys(data).forEach((filedName) => {
            setFieldValue(filedName, data[filedName], false);
          });
        });
      }
    }, [id]);
    return null;
  };

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
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} direction="column">
            <Grid item xs={8}>
              <Formik
                initialValues={userInitialValues}
                validationSchema={userValidation}
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
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          onSelect={handleChange}
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
                      <Button type="submit" disabled={!dirty || !isValid} onClick={handleClose}>{btnTitle}</Button>
                    </DialogActions>
                    <AutoUpdateForm id={editUserModal} />
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
