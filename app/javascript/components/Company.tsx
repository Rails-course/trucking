import * as React from 'react';
import { useState } from "react";
import axios from 'axios';
import CSRFToken from './cookies';

import Button from '@mui/material/Button';
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField
} from "@mui/material";



interface CompanyProps {
}

const Company: React.FC<CompanyProps> = (props: CompanyProps) => {
    const { } = props;
    const [isActiveModal, setModalActive] = useState(false)
    const [name, setName] = useState('')

    const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf

    const handleClickOpen = () => {
        setModalActive(true);
    };

    const handleClose = () => {
        setModalActive(false);
    };

    const createCompany = async () => {
        const testCompany = { name: 'safesoft' }
        const newCompany = { name: name }
        await axios.post("/companies/create", { company: newCompany })
            .catch(error => {
                console.error('There was an error!', error);
            })
    };

    return (
        <div className="wrapper">
            <Box sx={{ flexGrow: 1 }} >
                <Grid container spacing={2} >
                    <Grid item xs={4}>
                        <Button variant="outlined" onClick={handleClickOpen} color="inherit">
                            Create Company
                        </Button>
                    </Grid>
                    <Dialog open={isActiveModal} onClose={handleClose}>
                        <DialogTitle>Create New Company</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Company name"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={setName}
                                onChange={(event: any) => setName(event.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={createCompany}>Create</Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            </Box>
        </div>
    )
}

export default Company;