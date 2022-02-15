import * as React from 'react';
import { Form, Formik } from 'formik';

import {
    Container,
    Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';
import Button from '@mui/material/Button';

import axios from 'axios';

interface CreateCompanyFormProps {
    isActiveModal: boolean;
    handleClose: () => void;
}
const csrf = document.querySelector("meta[name='csrf-token']").getAttribute('content');
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf;

const CreateCompanyForm:React.FC <CreateCompanyFormProps> = (props: CreateCompanyFormProps) => {
    const {
        isActiveModal, handleClose,
    } = props;

    const handleSubmit = async (values) => {
        await axios.post('/companies/create', values)
            .catch((error) => {
                console.error('There was an error!', error);
            });
    };

    return (
        <div>
            <Formik

                initialValues={{ name: '' }}
                onSubmit={handleSubmit}
            >
                    {props => (
                        <Dialog open={isActiveModal}>
                            <DialogTitle>Create Company</DialogTitle>
                            <DialogContent>
                        <form onSubmit={props.handleSubmit}>
                            <input
                                type="text"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.name}
                                name="name"
                            />
                            {props.errors.name && <div id="feedback">{props.errors.name}</div>}
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit" onClick={handleClose}>Create</Button>
                            </DialogActions>
                        </form>
                            </DialogContent>
                        </Dialog>
                    )}
            </Formik>
        </div>
    );
};


export default CreateCompanyForm;