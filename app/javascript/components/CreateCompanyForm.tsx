import * as React from 'react';
import { Form, Formik } from 'formik';

import {
  Container,
  Dialog, DialogActions, DialogContent, DialogTitle, Grid,
} from '@mui/material';
import Button from '@mui/material/Button';

import axios from 'axios';
import FormikField from '../ui-components/FormikField';

interface CreateCompanyFormProps {
    isActiveModal: boolean;
    handleClose: () => void;
    setCompany: any,
}

const csrf = document.querySelector("meta[name='csrf-token']").getAttribute('content');
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf;

const CreateCompanyForm:React.FC <CreateCompanyFormProps> = (props: CreateCompanyFormProps) => {
  const {
    isActiveModal, handleClose, setCompany,
  } = props;

  const handleSubmit = async (values) => {
    await axios.post('/companies/create', values)
      .catch((error) => {
        console.error('There was an error!', error);
      });
    setTimeout( () => {
      axios.get('/companies.json').then((response) => {
        setCompany(response.data);
      });
        }, 100);
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
                    <FormikField
                      name="name"
                      label="Enter title"
                      required
                      type="text"
                      variant="standard"
                    />
                  </Container>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" onClick={handleClose}>Create</Button>
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
