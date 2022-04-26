import * as React from 'react';
import { Form, Formik } from 'formik';

import {
  Autocomplete, Container, Dialog, DialogActions,
  DialogContent, DialogTitle, Grid, TextField, Button,
} from '@mui/material';

import FormikField from '../../UI/FormikField';
import { warehouseFields } from '../../constants/warehouseFields';
import warehouseInitialValues, { warehouseFormValues } from '../../initialValues/warehouseInitialValues';
import warehouseValidation from '../../mixins/validation_schema/warehouse';
import httpClient from '../../api/httpClient';
import { CreateWarehouseFormProps, Warehouseman } from '../../common/interfaces_types';

const WarehouseCreateForm:
    React.FC<CreateWarehouseFormProps> = (props: CreateWarehouseFormProps) => {
      const {
        isActiveModal, handleClose, setWarehouses, formErrors, setFormErrors, setAlertData, alertSetOpen,
      } = props;
      const [warehousemans, setWarehousemans] = React.useState<Warehouseman[]>([]);
      const componentMounted = React.useRef(true);

      const handleSubmit = (warehouse: warehouseFormValues) => {
        httpClient.warehouses.create(warehouse)
          .then((response) => {
            setWarehouses((prev) => [...prev, response.data]);
            handleClose();
            setAlertData({
              alertType: 'success',
              alertText: 'Successfully created a warehouse!',
            });
            alertSetOpen(true);
          })
          .catch((error) => {
            setFormErrors(error.response.data);
            setAlertData({
              alertType: 'error',
              alertText: 'Something went wrong with creating a warehouse',
            });
            alertSetOpen(true);
          });
      };

      React.useEffect(() => {
        httpClient.users.get_warehousemans()
          .then((response) => {
            if (componentMounted.current) {
              setWarehousemans(response.data);
            }
          });
        return () => {
          componentMounted.current = false;
        };
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
                          <Button onClick={handleClose} color="error" variant="outlined">Cancel</Button>
                          <Button type="submit" disabled={!dirty || !isValid} color="success" variant="outlined">Create</Button>
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
