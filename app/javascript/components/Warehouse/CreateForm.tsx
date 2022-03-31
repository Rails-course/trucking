import * as React from 'react';
import { Form, Formik } from 'formik';

import {
  Autocomplete, Container, Dialog, DialogActions,
  DialogContent, DialogTitle, Grid, TextField, Button,
} from '@mui/material';

import FormikField from '../../UI/FormikField';
import { warehouseFields } from '../../constants/warehouseFields';
import warehouseInitialValues from '../../initialValues/warehouseInitialValues';
import warehouseValidation from '../../mixins/validation_schema/warehouse';
import httpClient from '../../api/httpClient';
import { CreateFormProps, Warehouseman } from '../../common/interfaces_types';

const WarehouseCreateForm: React.FC<CreateFormProps> = (props: CreateFormProps) => {
  const {
    isActiveModal, handleClose, handleSubmit, formErrors,
  } = props;
  const [warehousemans, setWarehousemans] = React.useState<Warehouseman[]>([]);

  React.useEffect(() => {
    httpClient.users.get_warehousemans().then((response) => setWarehousemans(response.data));
  }, []);

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
                {({
                  dirty, isValid, handleChange, values,
                }) => (
                  <Form>
                    <Container maxWidth="sm">
                      {formErrors ? <p className="error-msg">{formErrors}</p> : null}
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
                    <Autocomplete
                      id="warehouseman"
                      options={warehousemans}
                      getOptionLabel={(option: Warehouseman) => `${option.second_name} ${option.first_name} ${option.middle_name}`}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          onSelect={handleChange}
                          margin="normal"
                          label="Warehouseman"
                          fullWidth
                          value={values?.warehouseman}
                        />
                      )}
                    />
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button type="submit" disabled={!dirty || !isValid}>Create</Button>
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
