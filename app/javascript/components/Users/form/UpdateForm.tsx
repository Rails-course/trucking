import * as React from 'react';
import { Form, Formik } from 'formik';

import {
  Container,
  Dialog, DialogActions, DialogContent, DialogTitle, Grid,
} from '@mui/material';
import Button from '@mui/material/Button';

import FormikField from '../../../UI/FormikField';
import FormikSelect from '../../../UI/FormikSelect';
import validationSchema from '../../../mixins/validationSchema';
import { userFields } from '../../../constants/userFields';
import initialValues, { FormValues, roleItems } from '../../../mixins/initialValues/initialValues';
import httpClient from '../../../api/httpClient';

interface UpdateFormProps {
  isActiveModal: boolean;
  handleClose: () => void;
  setUser: any;
}

const UpdateForm: React.FC<UpdateFormProps> = (props: UpdateFormProps) => {
  const {
    isActiveModal, handleClose, setUser,
  } = props;

  const handleSubmit = async (user: FormValues) => {
    await httpClient.users.update(user);
    setUser((prevUser) => [...prevUser, user]);
  };

  return (
    <div>
      <Dialog
        open={isActiveModal}
        onClose={handleClose}
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 535 } }}
        maxWidth="xs"
      >
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} direction="column">
            <Grid item xs={8}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ dirty, isValid }) => (
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
                    <FormikSelect
                      name="role"
                      items={roleItems}
                      label="Role"
                      required
                    />
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button type="submit" disabled={!dirty || !isValid} onClick={handleClose}>Update</Button>
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

export default UpdateForm;
