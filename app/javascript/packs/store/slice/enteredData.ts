import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: '',
    password: '',
};

const enteredDataSlice = createSlice({
    name: "cardTabs",
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        }
    },
});

export const enteredDataActions = enteredDataSlice.actions;
export default enteredDataSlice.reducer;