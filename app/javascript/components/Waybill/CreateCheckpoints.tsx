import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Form, Formik } from 'formik';

import {
  Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Button,
} from '@mui/material';

import FormikField from '../../UI/FormikField';
import { CreateCheckpointsFormProps } from '../../common/interfaces_types';

const createCheckpoints:
    React.FC <CreateCheckpointsFormProps> = (props: CreateCheckpointsFormProps) => {
      const {
        isActiveModal, checkpointsHandleClose, setCheckpoints, checkpoints,
      } = props;

      const handleSubmit = (values) => setCheckpoints([...checkpoints, values]);

      return (
        <div>
          <Dialog
            open={isActiveModal}
            onClose={checkpointsHandleClose}
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
                        <FormikField
                          name="city_name"
                          label="Enter city name"
                          required
                          type="text"
                          variant="standard"
                        />
                      </Container>
                      <DialogActions>
                        <Button onClick={checkpointsHandleClose} color="error" variant="outlined">Cancel</Button>
                        <Button type="submit" onClick={checkpointsHandleClose} color="success" variant="outlined">Create</Button>
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

export default createCheckpoints;
