import * as React from 'react';

import FormControlLabel from '@mui/material/FormControlLabel';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Grid,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import TextFieldMui from '../ui-components/TextFieldMui';

import { userFields } from '../constants/userFields';
import { validateErrors } from '../mixins/validateErrors';
import useForm from '../hooks/useForm';

interface CreateFormProps {
    isActiveModal: boolean;
    handleClose: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props: CreateFormProps) => {
  const {
    isActiveModal, handleClose,
  } = props;

  const {
    handleChange, handleClear, handleSubmit, user, errors,
  } = useForm(validateErrors);

  return (
    <Dialog open={isActiveModal} onClose={handleClose}>
      <DialogTitle>Add User Of Company</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            {userFields.map((column) => (
              <TextFieldMui
                className=""
                id={column.id}
                key={column.id}
                label={column.placeholder}
                type={column.type}
                inputText={handleChange}
                value={user[`${column.model}`]}
                name={column.model}
                required={column.required}
                helperText={errors[`${column.model}`]}
                variant="standard"
              />
            ))}
          </Grid>
        </Grid>
        <FormControl margin="dense" onChange={handleChange}>
          <FormLabel id="demo-row-radio-buttons-group-label">Role</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="role"
          >
            <FormControlLabel value="manager" control={<Radio />} label="Manager" />
            <FormControlLabel value="dispatcher" control={<Radio />} label="Dispatcher" />
            <FormControlLabel value="driver" control={<Radio />} label="Driver" />
            <FormControlLabel value="owner" control={<Radio />} label="Owner" />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClear}>Cancel</Button>
        <Button onClick={handleSubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateForm;
