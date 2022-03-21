import * as React from 'react';
import { Form, Formik } from 'formik';

import {
  Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid,
} from '@mui/material';
import Button from '@mui/material/Button';

import FormikField from '../../UI/FormikField';
import { warehouseFields } from '../../constants/warehouseFields';
import warehouseInitialValues from '../../initialValues/warehouseInitialValues';
import warehouseValidation from '../../mixins/validation_schema/warehouse';

interface CreateFormProps {
  isActiveModal: boolean;
  handleClose: () => void;
  handleSubmit: any;
}

const WarehouseCreateForm: React.FC<CreateFormProps> = (props: CreateFormProps) => {
  const { isActiveModal, handleClose, handleSubmit } = props;

  return (
    <div>
      <Dialog
        open={isActiveModal}
        onClose={handleClose}
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 535 } }}
        maxWidth="xs"
      >
        <DialogTitle>Create Warehouse</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} direction="column">
            <Grid item xs={8}>
              <Formik
                initialValues={warehouseInitialValues}
                validationSchema={warehouseValidation}
                onSubmit={handleSubmit}
              >
                {({ dirty, isValid }) => (
                  <Form>
                    <Container maxWidth="sm">
                      {warehouseFields.map((column) => (
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

export default WarehouseCreateForm;
