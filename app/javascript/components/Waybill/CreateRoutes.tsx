import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Form, Formik } from 'formik';

import {
  Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Button,
} from '@mui/material';

import FormikField from '../../UI/FormikField';
import { CreateRoutesFormProps } from '../../common/interfaces_types';

const CreateRoutes:React.FC <CreateRoutesFormProps> = (props: CreateRoutesFormProps) => {
  const {
    isActiveModal, routeHandleClose, setRoutes, routes, formErrors,
  } = props;

  const handleSubmit = (values) => setRoutes([...routes, values]);

  return (
    <div>
      <Dialog
        open={isActiveModal}
        onClose={routeHandleClose}
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 535 } }}
        maxWidth="xs"
      >
        <DialogTitle>Add checkpoint</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} direction="column">
            <Grid item xs={8}>
              <Formik
                initialValues={{ id: uuidv4(), city_name: '' }}
                onSubmit={handleSubmit}
              >
                <Form>
                  <Container maxWidth="sm">
                    {formErrors ? <p className="error-msg">{formErrors}</p> : null}
                    <FormikField
                      name="city_name"
                      label="Enter city name"
                      required
                      type="text"
                      variant="standard"
                    />
                  </Container>
                  <DialogActions>
                    <Button onClick={routeHandleClose} color="error" variant="outlined">Cancel</Button>
                    <Button type="submit" onClick={routeHandleClose} color="success" variant="outlined">Create</Button>
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

export default CreateRoutes;
