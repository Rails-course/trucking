import * as React from 'react';
import { Form, Formik } from 'formik';

import {
  Container,
  Dialog, DialogActions, DialogContent, DialogTitle, Grid,
} from '@mui/material';
import Button from '@mui/material/Button';
import FormikField from '../UI/FormikField';
import {useState} from "react";
import CreateRoutes from "./waybil/CreateRoutes";
import RouteTable from "./waybil/RouteTable";
import httpClients from '../api/httpClient';
import waybillInitialValues from "../initialValues/waybillInitianalValue";

const CreateWaybill:React.FC  = () => {

  const [isActiveWayBill, setWayBillActive] = useState(false);
  const [isCreateRoutes, setCreateRoutes] = useState(false);
  const [routes, setRoutes] = useState([]);

  const handleSubmit =(values) => {
      let names=routes.map((name)=>name.city_name)
      httpClients.waybill.create(values,names)
      console.log(1)
};
  const CloseCreateRoutes=()=>{
    setCreateRoutes(false)
    }
  const handleClose = () => {
    setWayBillActive(false);
  };
    return (
        <div>
          <Button variant="outlined" onClick={()=>{setWayBillActive(true)}} >
            Open
          </Button>
          <Dialog
              open={isActiveWayBill}
              onClose={handleClose}
              sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 535 } }}
              maxWidth="xs"
          >
            <DialogTitle>Add Waybill</DialogTitle>
            <DialogContent>
              <Grid container spacing={2} direction="column">
                  <Formik
                      initialValues={waybillInitialValues}
                      onSubmit={handleSubmit}
                  >
                    <Form><Container maxWidth="sm">
                      <table >
                        <tr>
                          <td>
                              <FormikField
                                  name="ttn_id"
                                  label="Enter ttn_id"
                                  required
                                  type="text"
                                  variant="standard"
                              />
                              <FormikField
                                  name="town"
                                  label="Enter town"
                                  required
                                  type="text"
                                  variant="standard"
                              />
                              <FormikField
                                  name="street"
                                  label="Enter street"
                                  required
                                  type="text"
                                  variant="standard"
                              />
                              <FormikField
                                  name="building"
                                  label="Enter building"
                                  required
                                  type="text"
                                  variant="standard"
                              />
                              <FormikField
                                  name="end_town"
                                  label="Enter end_town"
                                  required
                                  type="text"
                                  variant="standard"
                              />
                        <FormikField
                            name="end_street"
                            label="Enter end_street"
                            required
                            type="text"
                            variant="standard"
                        />
                        <FormikField
                            name="end_building"
                            label="Enter end_building"
                            required
                            type="text"
                            variant="standard"
                        />
                              <label>start date</label>
                              <FormikField
                                  name="start_date"
                                  label=""
                                  required
                                  type="date"
                                  variant="standard"
                              />
                              <label>end date</label>
                              <FormikField
                                  name="end_date"
                                  label=""
                                  required
                                  type="date"
                                  variant="standard"
                              />
                          </td>
                        <td className="cell">
                      <RouteTable routes={routes} />
                        </td>
                       </tr>
                      </table>
                    </Container>
                      <DialogActions>
                        <Button onClick={()=>setCreateRoutes(true)}>create new checkpoints</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit" onClick={handleClose}>Create</Button>
                      </DialogActions>
                    </Form>
                  </Formik>
                  <CreateRoutes isActiveModal={isCreateRoutes} RoutehandleClose={CloseCreateRoutes} setRoutes={setRoutes} routes={routes} />

              </Grid>
            </DialogContent>
          </Dialog>
        </div>
    )
}

export default CreateWaybill;