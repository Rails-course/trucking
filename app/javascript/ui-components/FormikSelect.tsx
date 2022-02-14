import React, { ReactNode } from 'react';
import { Field, ErrorMessage, FieldInputProps } from 'formik';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FormikSelectItem } from '../initialValues/initialValues';

// import './FormikSelect.css';

interface FormikSelectProps {
    name: string;
    items: FormikSelectItem[];
    label: string;
    required: boolean;
}

interface MaterialUISelectFieldProps extends FieldInputProps<string> {
    errorString: string;
    children: ReactNode;
    label: string;
    required: boolean;
}

const MaterialUISelectField: React.FC<MaterialUISelectFieldProps> = ({
  errorString,
  label,
  children,
  value,
  name,
  onChange,
  onBlur,
  required,
}) => (
  <FormControl fullWidth>
    <InputLabel required={required}>{label}</InputLabel>
    <Select name={name} onChange={onChange} onBlur={onBlur} value={value}>
      {children}
    </Select>
    <FormHelperText>{errorString}</FormHelperText>
  </FormControl>
);

const FormikSelect: React.FC<FormikSelectProps> = ({
  name, items, label, required = false,
}) => (
  <div className="FormikSelect">
    <Field
      name={name}
      as={MaterialUISelectField}
      label={label}
      errorString={<ErrorMessage name={name} />}
      required={required}
    >
      {items.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </Field>
  </div>
);

export default FormikSelect;
