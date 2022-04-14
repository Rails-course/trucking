import * as React from 'react';
import { Form, Formik } from 'formik';
import {Button, ButtonProps, Grid, Stack, styled} from '@mui/material';
import { SearchProps } from '../common/interfaces_types';

import FormikField from '../UI/FormikField';
import { blue } from '@mui/material/colors';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    '&:hover': {
        backgroundColor: blue[700],
    },
}));

const Search: React.FC<SearchProps> = (props: SearchProps) => {
  const { setData, Data, searchField } = props;
  const handleSubmit = (values) => {
    setData(Data.filter((key) => key[searchField].includes(values.text)));
  };
  return (
    <Formik
      initialValues={{ text: '' }}
      onSubmit={handleSubmit}
    >
      <Form>
       <Grid  container spacing={2}>
         <Grid item xs={11}>
          <FormikField
            name="text"
            label="searching field"
            required={false}
            type="text"
            color="success"
            variant='standard'
            margin="dense"
          />
         </Grid>
         <Grid item xs={1}>
          <ColorButton  type="submit" variant="contained">Search</ColorButton>
       </Grid>
       </Grid>
      </Form>
    </Formik>
  );
};

export default Search;
