import * as React from 'react';
import { Form, Formik } from 'formik';
import { Button, Stack } from '@mui/material';
import { SearchProps } from '../common/interfaces_types';

import FormikField from '../UI/FormikField';

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
        <Stack direction="row">
          <FormikField
            name="text"
            label="searching field"
            required={false}
            type="text"
            variant="filled"
          />
          <Button type="submit" variant="contained">Search</Button>
        </Stack>
      </Form>
    </Formik>
  );
};

export default Search;
