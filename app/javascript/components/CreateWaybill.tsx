import * as React from 'react';
import { Form, Formik } from 'formik';

import {
  Container,
  Dialog, DialogActions, DialogContent, DialogTitle, Grid,
} from '@mui/material';
import Button from '@mui/material/Button';

import FormikField from '../ui-components/FormikField';
import {useState} from "react";
import CreateRoutes from "./waybil/CreateRoutes";
import RouteTable from "./waybil/RouteTable";
import httpClients from '../api/httpClient';

const CreateWaybill:React.FC  = () => {

  const [isActiveWayBill, setWayBillActive] = useState(false);
  const [isCreateRoutes, setCreateRoutes] = useState(false);
  const [routes, setRoutes] = useState([]);

  const handleSubmit =(values) => {
    Object.assign(values,{checkpoints:routes})
    httpClients.waybill.create(values)
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
                      initialValues={{ttn_date:'',driver_fio:'',truck_num:'',startpoint:'',endpoint:'',start_date:'',end_date:''}}
                      onSubmit={handleSubmit}
                  >
                    <Form><Container maxWidth="sm">
                      <table >
                        <tr>
                          <td>
                        <FormikField
                            name="ttn_number"
                            label="Enter ttn number"
                            required
                            type="text"
                            variant="standard"
                        />
                        <label>ttn_date</label>
                        <FormikField
                            name="ttn_date"
                            label=""
                            required
                            type="date"
                            variant="standard"
                        />
                        <FormikField
                            name="driver_fio"
                            label="Enter driver fio"
                            required
                            type="text"
                            variant="standard"
                        />
                        <FormikField
                            name="truck_num"
                            label="Enter truck num"
                            required
                            type="text"
                            variant="standard"
                        />
                        <FormikField
                            name="startpoint"
                            label="Enter startpoint"
                            required
                            type="text"
                            variant="standard"
                        />
                        <FormikField
                            name="endpoint"
                            label="Enter endpoint"
                            required
                            type="text"
                            variant="standard"
                        />
                        <label>ttn_date</label>
                        <FormikField
                            name="start_date"
                            label=""
                            required
                            type="date"
                            variant="standard"
                        />
                        <label>ttn_date</label>
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