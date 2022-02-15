import * as React from 'react';
import { Form, Formik } from 'formik';

import {
  Container,
  Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';
import Button from '@mui/material/Button';

import axios from 'axios';
import FormikField from '../ui-components/FormikField';
import FormikSelect from '../ui-components/FormikSelect';
import validationSchema from '../mixins/validationSchema';
import { userFields } from '../constants/userFields';
import initialValues, { FormValues, roleItems } from '../initialValues/initialValues';

interface CreateFormProps {
  isActiveModal: boolean;
  handleClose: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props: CreateFormProps) => {
  const {
    isActiveModal, handleClose,
  } = props;

  const handleSubmit = async (values: FormValues) => {
    await axios.post('/users/create', { user: values })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ dirty, isValid }) => (
          <Dialog open={isActiveModal}>
            <DialogTitle>Add User Of Company</DialogTitle>
            <DialogContent>
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
                  <Button type="submit" disabled={!dirty || !isValid} onClick={handleClose}>Create</Button>
                </DialogActions>
              </Form>
            </DialogContent>
          </Dialog>
        )}
      </Formik>
    </div>
  );
};

export default CreateForm;
