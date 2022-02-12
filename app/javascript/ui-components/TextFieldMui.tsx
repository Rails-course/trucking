import * as React from 'react';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';

interface TextFieldMuiProps {
    label: string;
    type: string;
    className: string;
    id: string;
    helperText: string;
    variant: any;
    name: string;
    value: string;
    required: boolean;
    inputText: any;
}

const TextFieldMui: React.FC<TextFieldMuiProps> = (props: TextFieldMuiProps) => {
  const {
    className,
    id,
    label,
    helperText,
    variant,
    value,
    name,
    type,
    required,
    inputText,
  } = props;

  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    if (value !== currentValue) {
      setCurrentValue(value);
    }
  }, [value]);

  const onChangeHandler = (e) => {
    setCurrentValue(e.target.value);
  };

  return (
    <TextField
      autoFocus
      margin="dense"
      id={id}
      label={label}
      type={type}
      value={currentValue}
      helperText={helperText}
      variant={variant}
      name={name}
      onChange={onChangeHandler}
      className={className}
      error={!!helperText}
      required={required}
      onBlur={inputText}
    />
  );
};

export default TextFieldMui;
