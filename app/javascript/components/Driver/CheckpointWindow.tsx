// @ts-ignore
import * as React from 'react';
// @ts-ignore
import { Form, Formik } from 'formik';

import {
  Button, DialogTitle, DialogContent, Dialog, Typography,
} from '@mui/material';

import httpClient from '../../api/httpClient';
import FormikField from '../../UI/FormikField';
import { CheckpointWindowFormProps } from '../../common/interfaces_types';

const CheckpointWindow:
    React.FC <CheckpointWindowFormProps> = (props: CheckpointWindowFormProps) => {
      const { id, status, updateData } = props;
      const [isActiveModal, setActiveModal] = React.useState(false);

      const handleClose = () => setActiveModal(false);

      const statusChange = () => {
        if (status) {
          httpClient.route.rollback({ ids: id }).then(()=>{
              updateData();
              handleClose();})
        } else {
          setActiveModal(true);
        }
      };

      const handleSubmit = (values) => {
        Object.assign(values, { ids: id });
        httpClient.route.passCh(values).then(()=>updateData())
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
                  <Typography>Pass date</Typography>
                  <FormikField
                    name="pass_date"
                    required
                    label=""
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
