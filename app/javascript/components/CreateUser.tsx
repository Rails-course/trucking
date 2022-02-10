import {
    Button,
    DialogActions,
    TextField
} from "@mui/material";
import * as React from "react";
import {MouseEventHandler} from "react";

interface CreateUserProps {
    createUser: any;
    handleClose: any;
}

const CreateUser: React.FC<CreateUserProps> = (props: CreateUserProps) => {
    const {createUser, handleClose} = props;
    return (
            <div>
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
                    id="password"
                    label="Confirm password"
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
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={createUser}>Create</Button>
            </DialogActions>
        </div>
    )
}

export default CreateUser;