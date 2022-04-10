import * as React from 'react';
import { Form, Formik, useFormikContext } from 'formik';

import {
  Autocomplete, Container, Dialog, DialogActions, Button,
  DialogContent, DialogTitle, Grid, TextField, Box,
} from '@mui/material';

import FormikField from '../../../UI/FormikField';
import { userFields, userFirstFields, userSecondFields } from '../../../constants/userFields';
import httpClient from '../../../api/httpClient';
import userInitialValues from '../../../initialValues/userInitialValues';
import userValidation from '../../../mixins/validation_schema/user';
import { CompanyType, RoleType, UserCreateFormProps } from '../../../common/interfaces_types';
import axios from 'axios';

const CreateForm: React.FC<UserCreateFormProps> = (props: UserCreateFormProps) => {
  const {
    isActiveModal, handleClose, handleSubmit, editUserModal, title, btnTitle, formErrors,
  } = props;

  const [companies, setCompanies] = React.useState(null);
  const [roles, setRoles] = React.useState(null);
  const componentMounted = React.useRef(true);

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
    const getCompanies = httpClient.companies.get_data()
    const getRoles = httpClient.roles.getAllRoles()
    axios.all([getCompanies, getRoles])
      .then(
        axios.spread((...responses) => {
          if (componentMounted.current) {
            setCompanies(responses[0].data);
            setRoles(responses[1].data);
          }
        })
      )
    return () => {
      componentMounted.current = false;
    }
  }, []);

  return (
    <div>
      <Dialog
        open={isActiveModal}
        onClose={handleClose}
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 735 } }}
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
                      {formErrors ? <p className="error-msg">{formErrors}</p> : null}
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
                      <div style={{ width: '100%', display: 'flex' }}>
                        <Box
                          component="div"
                          display="flex"
                          flexDirection="row"
                          columnGap="15px"
                          bgcolor="background.paper"
                        >
                          {userFirstFields.map((column) => (
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
                      </div>
                      <div style={{ width: '100%', display: 'flex' }}>
                        <Box
                          component="div"
                          display="flex"
                          flexDirection="row"
                          columnGap="15px"
                          bgcolor="background.paper"
                        >
                          {userSecondFields.map((column) => (
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
                      </div>
                      <Autocomplete
                        id="company"
                        options={companies}
                        getOptionLabel={(option: CompanyType) => option.name}
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
                      <Autocomplete
                        id="role"
                        options={roles}
                        getOptionLabel={(option: RoleType) => option.role_name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            onSelect={handleChange}
                            margin="normal"
                            label="Role"
                            fullWidth
                            value={values?.role}
                          />
                        )}
                      />
                    </Container>
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
