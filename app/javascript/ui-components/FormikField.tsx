import React from 'react';
import { ErrorMessage, Field } from 'formik';
import TextField from '@mui/material/TextField';

interface FormikFieldProps {
    name: string;
    label: string;
    type: string;
    required: boolean;
    variant: string;
}

const FormikField: React.FC<FormikFieldProps> = ({
                                                     name, label, type, required, variant,
                                                 }) => (
    <div className="FormikField">
        <Field
            required={required}
            autoComplete="off"
            as={TextField}
            label={label}
            name={name}
            fullWidth
            type={type}
            helperText={<ErrorMessage name={name} className="error-msg" />}
            variant={variant}
        />
    </div>
);

export default FormikField;