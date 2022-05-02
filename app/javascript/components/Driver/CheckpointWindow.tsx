import * as React from 'react';
import { Form, Formik } from 'formik';

import {
  Button, DialogTitle, DialogContent, Dialog, Typography,
} from '@mui/material';

import httpClient from '../../api/httpClient';
import FormikField from '../../UI/FormikField';
import { CheckpointWindowFormProps } from '../../common/interfaces_types';

const CheckpointWindow:
  React.FC<CheckpointWindowFormProps> = (props: CheckpointWindowFormProps) => {
    const {
      checkpointID, status, currentUserRole, checkpoints, setCheckpoints, setAlertData,
    } = props;
    const [isActiveModal, setActiveModal] = React.useState(false);

    const handleClose = () => setActiveModal(false);

    const statusChange = () => {
      if (status) {
        httpClient.checkpoints.passCh({ ids: checkpointID , pass_date: null, is_passed: false })
          .then((response) => {
            const objIndex = checkpoints.findIndex((checkpoint: any) => checkpoint.id === checkpointID);
            checkpoints[objIndex] = response.data;
            setCheckpoints(checkpoints);
            setAlertData({
              alertType: 'info',
              alertText: 'Successfully rollback checkpoint!',
              open: true,
            });
          });
      } else setActiveModal(true);
    };

    const handleSubmit = (values) => {
      Object.assign(values, { ids: checkpointID, is_passed: true });
      httpClient.checkpoints.passCh(values)
        .then((response) => {
          const objIndex = checkpoints.findIndex((checkpoint: any) => checkpoint.id === checkpointID);
          checkpoints[objIndex] = response.data;
          setCheckpoints(checkpoints);
          setAlertData({
            alertType: 'success',
            alertText: 'Successfully passed checkpoint!',
            open: true,
          });
        });
    };

    return (
      <>
        <Button
          onClick={() => statusChange()}
          disabled={!(currentUserRole === 'driver')}
        >
          {status ? 'rollback' : 'pass'}
        </Button>
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
                <Button type="submit" onClick={handleClose} variant="outlined" color="success">save</Button>
              </Form>
            </Formik>
          </DialogContent>
        </Dialog>
      </>
    );
  };

export default CheckpointWindow;
