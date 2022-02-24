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

interface CreateFormProps {
  isActiveModal: boolean;
  handleClose: () => void;
  userIds: any;
setUser: any;
}

const CreateForm: React.FC<CreateFormProps> = (props: CreateFormProps) => {
  const {
    isActiveModal, handleClose, setUser, userIds,
  } = props;
  // const [nameId, setNameId] = React.useState(null);
  const isUpdateModal = true;
  let title = 'Add User Of Company';
  // const [newUserDatas, setNewUserDatas] = React.useState(initialValues);
  // const [oldUserDatas, setOldUserDatas] = React.useState(initialValues);

  if (isUpdateModal) {
    userIds.forEach(() => {
      title = 'Update Profile';
      userIds.map((it) => {
        httpClient.users.get(it);
        console.log(it);
      });
    });
  } else {
    console.log('asdfsf');

    // console.log(isUpdateModal);
  }
  // console.log(nameId);

  // console.log(users.map((user) => httpClient.users.get(user.id)));

  const handleSubmit = async (user: FormValues) => {
    await httpClient.users.create(user);
    setUser((prevUser) => [...prevUser, user]);
    httpClient.users.getAll().then();
  };

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
