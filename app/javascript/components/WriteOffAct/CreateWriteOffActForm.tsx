import * as React from 'react';
import { Form, Formik } from 'formik';

import {
  Autocomplete, Container, Dialog, DialogActions,
  DialogContent, DialogTitle, Grid, TextField, Button,
} from '@mui/material';

import FormikField from '../../UI/FormikField';
import httpClient from '../../api/httpClient';
import writeOffActInitialValues from '../../initialValues/writeOffActInitialValues';
import { writeOffActFields } from '../../constants/writeOffActFields';
import { CreateWriteOffActFormProps } from '../../common/interfaces_types';

const CreateWriteOffActForm:
  React.FC<CreateWriteOffActFormProps> = (props: CreateWriteOffActFormProps) => {
    const {
      isActiveModal, handleClose, handleSubmit, formErrors,
    } = props;

    const [consignments, setConsignments] = React.useState([]);
    const componentMounted = React.useRef(true);

    React.useEffect(() => {
      httpClient.consignments.getAll()
        .then((response) => {
          if (componentMounted.current) {
            setConsignments(response.data);
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
          <DialogTitle>Write-off Act Form</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} direction="column">
              <Grid item xs={12}>
                <Formik
                  initialValues={writeOffActInitialValues}
                  onSubmit={handleSubmit}
                >
                  {({
                    dirty, isValid, handleChange, values,
                  }) => (
                    <Form>
                      <Container maxWidth="sm">
                        {formErrors ? <p className="error-msg">{formErrors}</p> : null}
                        {writeOffActFields.map((column) => (
                          <FormikField
                            key={column.id}
                            name={column.model}
                            label={column.placeholder}
                            required={column.required}
                            type={column.type}
                            variant="standard"
                            style={{ marginBottom: '10px' }}
                          />
                        ))}
                        <Autocomplete
                          id="consignment"
                          options={consignments}
                          getOptionLabel={(consignment) => `${consignment.consignment_seria} ${consignment.consignment_number}`}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              onSelect={handleChange}
                              margin="normal"
                              label="Consignment"
                              fullWidth
                              value={values?.consignment}
                            />
                          )}
                        />
                        <TextField
                          id="description"
                          label="Description"
                          multiline
                          fullWidth
                          maxRows={4}
                          value={values.description}
                          onChange={handleChange}
                        />
                      </Container>

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

export default CreateWriteOffActForm;
