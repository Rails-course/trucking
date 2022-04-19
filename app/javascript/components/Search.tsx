import * as React from 'react';
import { Form, Formik } from 'formik';
import {Button, ButtonProps, Grid, Stack, styled} from '@mui/material';
import { SearchProps } from '../common/interfaces_types';

import FormikField from '../UI/FormikField';
import { blue } from '@mui/material/colors';



const Search: React.FC<SearchProps> = (props: SearchProps) => {
  const { setData, Data } = props;
    const handleSubmit = (values) => {
        //replace(/\s+/g, ' ').trim() - remove duplicated spaces
        let data=(Data.filter((key) => Object.values(key).toString().includes((values.text).replace(/\s+/g, ' ').trim().replace(' ',','))));
        if (values.text!='' || data.length>0) {setData(data)}
        else {setData(null)}
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
          <Button  type="submit" variant="contained">Search</Button>
       </Grid>
       </Grid>
      </Form>
    </Formik>
  );
};

export default Search;
