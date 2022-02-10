import { v4 as uuidv4 } from "uuid";
import { createSlice } from "@reduxjs/toolkit";

interface USER_DATA {
    id: string;
    email: string;
    password: string;
    confirmPassword: string;
}
const initialState: Array<USER_DATA> = [
    {
        "id": uuidv4(),
        "email": '',
        "password": '',
        "confirmPassword": '',
    }
]

const usersDataSlice = createSlice({
    name: "userData",
    initialState: {users: initialState},
    reducers: {
        setUsersData: (state, action) => {
            return {
                ...state,
                users: [...action.payload],
            };
        },
        addUser: (state, action) => {
            return {
                ...state,
                users: [...state.users, action.payload],
            };
        },
        deleteUser: (state, action) => {
            const usersData = state.users.filter(
                (elem) => elem.id !== action.payload.id
            );
            return {
                ...state,
                users: [...usersData],
            };
        },
        saveUser: (state, action) => {
            const userData = state.users.map((obj) => {
                if (obj.id === action.payload.id) {
                    obj = action.payload;
                }
                return obj;
            });
            return {
                ...state,
                users: [...userData],
            };
        },
    },
});

export const usersDataActions = usersDataSlice.actions;
export default usersDataSlice.reducer;