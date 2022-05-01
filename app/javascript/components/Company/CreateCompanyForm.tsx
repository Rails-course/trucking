import * as React from 'react';
import { Form, Formik } from 'formik';

import {
  Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Button,
} from '@mui/material';

import FormikField from '../../UI/FormikField';
import { CreateCompanyFormProps } from '../../common/interfaces_types';
import httpClient from '../../api/httpClient';

const CreateCompanyForm: React.FC<CreateCompanyFormProps> = (props: CreateCompanyFormProps) => {
  const {
    isActiveModal, handleClose, setCompany, setFormErrors, formErrors, setAlertData,
  } = props;

  const handleSubmit = async (company) => {
    await httpClient.companies.create(company)
      .then((response) => {
        handleClose();
        setCompany((prevCompany) => [...prevCompany, response.data]);
        setAlertData({
          alertType: 'success',
          alertText: 'Successfully created a company!',
          open: true,
        });
      })
      .catch((error) => {
        setFormErrors(error.response.data);
        setAlertData({
          alertType: 'error',
          alertText: 'Something went wrong with creating a company',
          open: true,
        });
      });
  };

  return (
    <div>
      <Dialog
        open={isActiveModal}
        onClose={handleClose}
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 535 } }}
        maxWidth="xs"
      >
        <DialogTitle>Add Company</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} direction="column">
            <Grid item xs={8}>
              <Formik
                initialValues={{ name: '' }}
                onSubmit={handleSubmit}
              >
                <Form>
                  <Container maxWidth="sm">
                    {formErrors ? <p className="error-msg">{formErrors}</p> : null}
                    <FormikField
                      name="name"
                      label="Enter title"
                      required
                      type="text"
                      variant="standard"
                    />
                  </Container>
                  <DialogActions>
                    <Button onClick={handleClose} color="error" variant="outlined">Cancel</Button>
                    <Button type="submit" color="success" variant="outlined">Create</Button>
                  </DialogActions>
                </Form>
              </Formik>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateCompanyForm;
