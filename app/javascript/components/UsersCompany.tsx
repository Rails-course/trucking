import * as React from 'react';
import { useState } from "react";
import axios from 'axios';
import CSRFToken from './cookies';
// import {useAppDispatch, useAppSelector} from "../packs/hooks";
// import {enteredDataActions} from "../packs/store/slice/enteredData";

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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

interface UsersCompanyProps {
}

const UsersCompany: React.FC<UsersCompanyProps> = (props: UsersCompanyProps) => {
    const { } = props;
    const [isActiveModal, setModalActive] = useState(false);
    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [data, setData] = useState('')
    const [login, setLogin] = useState('')
    const [email, setEmail] = useState('test11@test.com')
    const [password, setPassword] = useState('password1')
    const [passwordConfirm, setPasswordConfirm] = useState('password1')
    const [flat, setFlat] = useState('')
    const [house, setHouse] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    // const dispatch = useAppDispatch();
    // const emailSelector = useAppSelector((state) => state.enteredData.email)
    // const passwordSelector = useAppSelector((state) => state.enteredData.password)
    const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf
    const createUser = async () => {
        // const newUser = { email: emailSelector, password: passwordSelector }
        const newUser = {
            firstName: firstName, middleName: middleName, lastName: lastName,
            data: data, login: login, email: email,
            password: password, password_confirmation: passwordConfirm,
            flat: flat, house: house, street: street, city: city
        }
        await axios.post("/users/create", { user: newUser })
            .catch(error => {
                console.error('There was an error!', error);
            })
    };

    return (
        <div className="wrapper">
            <Box sx={{ flexGrow: 1 }} >
                <Grid container spacing={2} >
                    <Grid item xs={8}>
                        Form for create of User
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="outlined" onClick={() => setModalActive(true)} color="inherit">
                            Create User
                        </Button>
                    </Grid>
                    <Dialog open={isActiveModal} onClose={() => { setModalActive(false) }}>
                        <DialogTitle>Add User Of Company</DialogTitle>
                        <DialogContent>
                            <Grid container spacing={3}>
                                <Grid item xs={4}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="firstName"
                                        label="First Name"
                                        type="text"
                                        variant="standard"
                                        value={setFirstName}
                                        onChange={(event: any) => setFirstName(event.target.value)}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="middleName"
                                        label="Middle Name"
                                        type="text"
                                        variant="standard"
                                        value={setMiddleName}
                                        onChange={(event: any) => setMiddleName(event.target.value)}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="lastName"
                                        label="Last Name"
                                        type="text"
                                        variant="standard"
                                        value={setLastName}
                                        onChange={(event: any) => setLastName(event.target.value)}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="dateBirth"
                                        type="date"
                                        variant="standard"
                                        value={setData}
                                        onChange={(event: any) => setData(event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="city"
                                        label="City"
                                        type="text"
                                        variant="standard"
                                        value={setCity}
                                        onChange={(event: any) => setCity(event.target.value)}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="street"
                                        label="Street"
                                        type="text"
                                        variant="standard"
                                        value={setStreet}
                                        onChange={(event: any) => setStreet(event.target.value)}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="house"
                                        label="House"
                                        type="text"
                                        variant="standard"
                                        value={setHouse}
                                        onChange={(event: any) => setHouse(event.target.value)}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="flat"
                                        label="Flat"
                                        type="text"
                                        variant="standard"
                                        value={setFlat}
                                        onChange={(event: any) => setFlat(event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="login"
                                        label="Login"
                                        type="text"
                                        variant="standard"
                                        value={setLogin}
                                        onChange={(event: any) => setLogin(event.target.value)}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="email"
                                        label="E-mail"
                                        type="email"
                                        variant="standard"
                                        value={setEmail}
                                        onChange={(event: any) => setEmail(event.target.value)}
                                    // value={emailSelector}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="password"
                                        label="Password"
                                        type="password"
                                        variant="standard"
                                        value={setPassword}
                                        onChange={(event: any) => setPassword(event.target.value)}
                                    // value={passwordSelector}
                                    // onChange={(event) => dispatch(enteredDataActions.setPassword(event.target.value))}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="password"
                                        label="Confirm password"
                                        type="password"
                                        variant="standard"
                                        value={setPasswordConfirm}
                                        onChange={(event: any) => setPasswordConfirm(event.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            <FormControl margin="dense">
                                <FormLabel id="demo-row-radio-buttons-group-label">Role</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="manager" control={<Radio />} label="Manager" />
                                    <FormControlLabel value="dispatcher" control={<Radio />} label="Dispatcher" />
                                    <FormControlLabel value="driver" control={<Radio />} label="Driver" />
                                    <FormControlLabel value="owner" control={<Radio />} label="Owner" />
                                </RadioGroup>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => { setModalActive(false) }}>Cancel</Button>
                            <Button onClick={createUser}>Create</Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            </Box>
        </div>
    )
}

export default UsersCompany;