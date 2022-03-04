import * as React from 'react';
import { Form, Formik } from 'formik';

import {
  Container,
  Dialog, DialogActions, DialogContent, DialogTitle, Grid,
} from '@mui/material';
import Button from '@mui/material/Button';

import axios from 'axios';
import FormikField from '../ui-components/FormikField';
import CompanyTable from "./CompanyTable";
import {useState} from "react";
import CreateRoutes from "./CreateRoutes";

const CreateWaybill:React.FC  = () => {
  const [isActiveRoute, setRouteActive] = useState(false);
  const [isActiveModal, setModalActive] = useState(false);
  const [routes, setRoutes] = useState(null);
  const handleSubmit = async (values) => {
  console.log(values)
};
  const handleClose = () => {
    setModalActive(false);
  };
  const handleOpen= ()=> {
    setModalActive(true);
  }
    const RoutehandleClose = () => {
        setModalActive(false);
    };
    return (
        <div>
          <Button variant="outlined" onClick={()=>{handleOpen()}} >
            Open
          </Button>
          <Dialog
              open={isActiveModal}
              onClose={handleClose}
              sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 535 } }}
              maxWidth="xs"
          >
            <DialogTitle>Add Waybill</DialogTitle>
            <DialogContent>
              <Grid container spacing={2} direction="column">
                <Grid item xs={8}>
                  <Formik
                      initialValues={{ name: '' ,ttn_date:'',driver_fio:'',truck_num:'',startpoint:'',endpoint:'',start_date:'',end_date:''}}
                      onSubmit={handleSubmit}
                  >
                    <Form>
                      <Container maxWidth="sm">
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
                          <CreateRoutes  isActiveModal={isActiveRoute} setRoutes={setRoutes} RoutehandleClose={RoutehandleClose}/>
                      </Container>
                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit" onClick={handleClose}>Create</Button>
                      </DialogActions>
                    </Form>
                  </Formik>
                    <Button variant="outlined" onClick={() => setRouteActive(true)} color="inherit">
                        Checkpoints
                    </Button>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
        </div>
    )
}

export default CreateWaybill;