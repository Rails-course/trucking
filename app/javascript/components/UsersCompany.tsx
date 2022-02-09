import * as React from 'react';
import {useState} from "react";

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

interface UsersCompanyProps {
}

const UsersCompany: React.FC<UsersCompanyProps> = (props: UsersCompanyProps) => {
    const {} = props;
    const [isActiveModal, setModalActive] = useState(false)

    const handleClickOpen = () => {
        setModalActive(true);
    };

    const handleClose = () => {
        setModalActive(false);
    };

    return (
        <div className="wrapper">
            <Box sx={{ flexGrow: 1 }} >
                <Grid container spacing={2} >
                    <Grid item xs={8}>
                        Form for create of User
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="outlined" onClick={handleClickOpen} color="inherit">
                            Create User
                        </Button>
                    </Grid>
                    <Dialog open={isActiveModal} onClose={handleClose}>
                        <DialogTitle>Add User Of Company</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="email"
                                label="Email address"
                                type="email"
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="password"
                                label="Password"
                                type="password"
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Name"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleClose}>Create</Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            </Box>
        </div>
    )
}

export default UsersCompany;