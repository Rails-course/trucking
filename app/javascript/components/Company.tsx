import * as React from 'react';
import { useState } from "react";
import axios from 'axios';

import Button from '@mui/material/Button';
import { Box, Grid } from '@mui/material';
import CreateCompanyForm from './CreateCompanyForm';


function Company() {
    const [isActiveModal, setModalActive] = useState(false);

    const handleClose = () => {
        setModalActive(false);
    };

    return (
        <div className="wrapper">
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        Form for Create Company
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="outlined" onClick={() => setModalActive(true)} color="inherit">
                            Create Company
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <CreateCompanyForm isActiveModal={isActiveModal} handleClose={handleClose} />
        </div>
    );
}

export default Company;