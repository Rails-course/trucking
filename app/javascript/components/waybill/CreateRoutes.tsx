import * as React from 'react';
import { Form, Formik } from 'formik';

import {
  Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid,
} from '@mui/material';
import Button from '@mui/material/Button';

import FormikField from '../../UI/FormikField';

interface CreateRoutesFormProps {
    isActiveModal: boolean;
    routeHandleClose: () => void;
    setRoutes: any, routes: any
}

const CreateRoutes:React.FC <CreateRoutesFormProps> = (props: CreateRoutesFormProps) => {
  const {
    isActiveModal, routeHandleClose, setRoutes, routes,
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
                initialValues={{ city_name: '' }}
                onSubmit={handleSubmit}
              >
                <Form>
                  <Container maxWidth="sm">
                    <FormikField
                      name="city_name"
                      label="Enter city name"
                      required
                      type="text"
                      variant="standard"
                    />
                  </Container>
                  <DialogActions>
                    <Button onClick={routeHandleClose}>Cancel</Button>
                    <Button type="submit" onClick={routeHandleClose}>Create</Button>
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
