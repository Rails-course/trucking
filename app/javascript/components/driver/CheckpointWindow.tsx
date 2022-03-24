import * as React from 'react';
import {
  Button, DialogTitle, DialogContent, Dialog,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import httpClient from '../../api/httpClient';
import FormikField from '../../UI/FormikField';

interface CheckpointWindowFormProps {
  id:number,
  status:boolean,
    update_data:()=>void,
}
const CheckpointWindow:React.FC <CheckpointWindowFormProps> = (props: CheckpointWindowFormProps) => {
  const { id, status, update_data } = props;
  const [isActiveModal, setActiveModal] = useState(false);
  const statusChange = () => {
    if (status) {
      httpClient.route.rollback({ ids: id });
      update_data();
      handleClose();
    } else {
      setActiveModal(true);
    }
  };
  const handleClose = () => {
    setActiveModal(false);
  };
  const handleSubmit = (values) => {
    Object.assign(values, { ids: id });
    httpClient.route.passCh(values);
    update_data();
  };

  return (
    <>
      <Button onClick={() => statusChange()}>{status ? 'rollback' : 'pass'}</Button>
      <Dialog
        open={isActiveModal}
        onClose={handleClose}
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 535 } }}
        maxWidth="xs"
      >
        <DialogTitle>checkpoint</DialogTitle>
        <DialogContent>

          <Formik
            initialValues={{ pass_date: '' }}
            onSubmit={handleSubmit}
          >
            <Form>
              <FormikField
                name="pass_date"
                label="pass date"
                required
                type="date"
                variant="standard"
              />
              <Button type="submit" onClick={handleClose}>save</Button>
            </Form>
          </Formik>

        </DialogContent>
      </Dialog>
    </>
  );
};

export default CheckpointWindow;
