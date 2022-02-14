import * as React from 'react';
import { TextField } from '@mui/material';
// import { useEffect, useState } from 'react';
import { ErrorMessage } from 'formik';

interface TextFieldMuiProps {
    label: string;
    type: string;
    className: string;
    id: string;
    variant: any;
    name: string;
    // value: string;
    required: boolean;
    // inputText: any;
}

const TextFieldMui: React.FC<TextFieldMuiProps> = (props: TextFieldMuiProps) => {
  const {
    className,
    id,
    label,
    variant,
    // value,
    name,
    type,
    required,
    // inputText,
  } = props;

  // const [currentValue, setCurrentValue] = useState(value);

  // useEffect(() => {
  //   if (value !== currentValue) {
  //     setCurrentValue(value);
  //   }
  // }, [value]);
  //
  // const onChangeHandler = (e) => {
  //   setCurrentValue(e.target.value);
  // };

  return (
    <TextField
      autoFocus
      margin="dense"
      id={id}
      label={label}
      type={type}
      // value={currentValue}
      helperText={<ErrorMessage name={name} />}
      variant={variant}
      name={name}
      // onChange={onChangeHandler}
      className={className}
      required={required}
      // onBlur={inputText}
    />
  );
};

export default TextFieldMui;
