import * as React from 'react';
import { Form, Formik } from 'formik';

import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { SearchProps } from '../common/interfaces_types';
import FormikField from '../UI/FormikField';
import { SearchPanel } from '../utils/style';

const Search: React.FC<SearchProps> = (props: SearchProps) => {
  const { setData, Data, keyField } = props;

  const normalize = (str: string) => str.toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/ /g, '')
    .replace(/,/g, '');

  const handleSubmit = (values) => {
    let data = (Data.filter((key) => normalize(Object.values(key).toString())
      .includes(normalize((values.text)))));
    if (keyField !== '') {
      const secondData = (Data.filter((key) => normalize(Object.values(key[keyField]).toString())
        .includes(normalize((values.text)))));
      data = data.concat(secondData);
    }
    if (values.text !== '') setData(data);
    else setData(null);
  };

  return (
    <SearchPanel>
      <Formik
        initialValues={{ text: '' }}
        onSubmit={handleSubmit}
      >
        <Form style={{ display: 'flex', alignItems: 'center', padding: '0 0 0 15px' }}>
          <FormikField
            name="text"
            label="Search..."
            required={false}
            type="text"
            color="success"
            variant="standard"
          />
          <IconButton size="large" aria-label="search" type="submit">
            <SearchIcon />
          </IconButton>
        </Form>
      </Formik>
    </SearchPanel>
  );
};

export default Search;
