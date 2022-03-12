import React from "react"
import {Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid} from "@mui/material";
import {Form, Formik} from "formik";
import FormikField from "../../ui-components/FormikField";
import Button from "@mui/material/Button";

interface CreateRoutesFormProps {
    isActiveModal: boolean;
     RoutehandleClose: () => void;
    setRoutes: any,routes: any
}

const CreateRoutes:React.FC <CreateRoutesFormProps> = (props: CreateRoutesFormProps) => {
    const {
        isActiveModal, RoutehandleClose, setRoutes,routes
    } = props; 

    const handleSubmit =(values) => {
       setRoutes([...routes,values])
    }
    return (
        <div>
          <Dialog
              open={isActiveModal}
              onClose={RoutehandleClose}
              sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 535 } }}
              maxWidth="xs"
          >
            <DialogTitle>Add checkpoint</DialogTitle>
            <DialogContent>
              <Grid container spacing={2} direction="column">
                <Grid item xs={8}>
                  <Formik
                      initialValues={{name: '' }}
                      onSubmit={handleSubmit}
                  >
                    <Form>
                      <Container maxWidth="sm">
                        <FormikField
                            name="name"
                            label="Enter city name"
                            required
                            type="text"
                            variant="standard"
                        />
                      </Container>
                      <DialogActions>
                        <Button onClick={RoutehandleClose}>Cancel</Button>
                        <Button type="submit" onClick={RoutehandleClose}>Create</Button>
                      </DialogActions>
                    </Form>
                  </Formik>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
        </div>
    );
  }


export default CreateRoutes
