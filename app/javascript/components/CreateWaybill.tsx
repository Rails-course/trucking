import * as React from 'react';
import { Form, Formik } from 'formik';

import {
  Autocomplete,
  Container,
  Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField,

} from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import FormikField from '../UI/FormikField';
import CreateRoutes from './waybill/CreateRoutes';
import RouteTable from './waybill/RouteTable';
import httpClients from '../api/httpClient';
import waybillInitialValues from '../initialValues/waybillInitianalValue';
import validationWaybill from '../mixins/validation_schema/waybill';
import { waybillFields } from '../constants/waybillFields';

interface CreateWaybillsFormProps {
  id: number;
}
const CreateWaybill: React.FC<CreateWaybillsFormProps> = (props: CreateWaybillsFormProps) => {
  const { id } = props;

  const [isActiveWayBill, setWayBillActive] = useState(false);
  const [isCreateRoutes, setCreateRoutes] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [data, setData] = useState(null);
  const [owners, setOwners] = useState([]);

  React.useEffect(() => {
    httpClients.waybill.get_data_waybill(id).then((response) => {
      setData(response.data);
    });
    httpClients.goods_owner.get_names().then((response) => { setOwners(response.data); });
  }, []);

  const handleSubmit = (values) => {
    const city_names = routes.map((name) => name.city_name);
    httpClients.waybill.create(values, city_names, id);
  };

  const CloseCreateRoutes = () => {
    setCreateRoutes(false);
  };

  const handleClose = () => {
    setWayBillActive(false);
  };
  // @ts-ignore
  return (
    <div>
      <Button variant="outlined" onClick={() => { setWayBillActive(true); }}>
        Create waybill
      </Button>
      <Dialog
        open={isActiveWayBill}
        onClose={handleClose}
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 535 } }}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Create Waybill Form</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} direction="column">
            <Formik
              initialValues={waybillInitialValues}
              onSubmit={handleSubmit}
              validationSchema={validationWaybill}
            >
              {({
                dirty, isValid, handleChange, values,
              }) => (
                <Form>
                  <Container align="left" maxWidth="md">
                    <table>
                      <tr>
                        <td>
                          <br />
                          <p>
                            {' '}
                            <label>
                              truck number-
                              {data.truck_number}
                            </label>
                          </p>
                          <p>
                            {' '}
                            <label>
                              driver fio-
                              {data.driver_fio}
                            </label>
                          </p>
                          {waybillFields.map((column) => (
                            <FormikField
                              key={column.id}
                              name={column.model}
                              label={column.placeholder}
                              required={column.required}
                              type={column.type}
                              variant="standard"
                            />
                          ))}
                          <Autocomplete
                            id="goods_owner"
                            options={owners}
                            getOptionLabel={(option) => option.warehouse_name}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                onSelect={handleChange}
                                margin="normal"
                                label="goods_owner"
                                fullWidth
                                value={values?.owner}
                              />
                            )}
                          />
                        </td>
                        <td className="cell">
                          <RouteTable routes={routes} />
                        </td>
                      </tr>
                    </table>
                  </Container>
                  <DialogActions>
                    <Button onClick={() => setCreateRoutes(true)}>create new checkpoints</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" disabled={!dirty || !isValid} onClick={handleClose}>Create</Button>
                  </DialogActions>
                </Form>
              )}
            </Formik>
            <CreateRoutes isActiveModal={isCreateRoutes} RoutehandleClose={CloseCreateRoutes} setRoutes={setRoutes} routes={routes} />
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateWaybill;
