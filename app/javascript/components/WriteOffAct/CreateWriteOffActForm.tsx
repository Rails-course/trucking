import * as React from 'react';
import { Form, Formik } from 'formik';

import {
  Autocomplete,
  Container,
  Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField,
} from '@mui/material';
import Button from '@mui/material/Button';

import FormikField from '../../UI/FormikField';
import httpClient from '../../api/httpClient';
import writeOffActInitialValues from '../../initialValues/writeOffActInitialValues';
import { writeOffActFields } from '../../constants/writeOffActFields';

interface CreateWriteOffActFormProps {
  isActiveModal: boolean;
  handleClose: () => void;
  handleSubmit: any;
}

const CreateWriteOffActForm:
  React.FC<CreateWriteOffActFormProps> = (props: CreateWriteOffActFormProps) => {
    const {
      isActiveModal, handleClose, handleSubmit,
    } = props;

    const [consignments, setConsignments] = React.useState([]);
    React.useEffect(() => {
      httpClient.consignments.getAll().then((response) => setConsignments(response.data));
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
                      <Container maxWidth="sm">
                        {writeOffActFields.map((column) => (
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
                      <TextField
                        id="description"
                        label="Description"
                        multiline
                        fullWidth
                        maxRows={4}
                        value={values.description}
                        onChange={handleChange}
                      />
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

export default CreateWriteOffActForm;
