import { createSlice } from '@reduxjs/toolkit';
import { createUser } from '../actions/userAction';

const initialState = {
  firstName: '',
  middleName: '',
  lastName: '',
  date: null,
  login: '',
  email: '',
  password: '',
  repeatPassword: '',
  flat: '',
  house: '',
  street: '',
  city: '',
  role: null,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

const usersDataSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: {
    // [createUser.fulfilled]: (state, { payload }) => {
    //   state.isFetching = false;
    //   state.isSuccess = true;
    //   state.firstName = payload.firstName;
    //   state.middleName = payload.middleName;
    //   state.lastName = payload.lastName;
    //   state.date = payload.date;
    //   state.email = payload.email;
    // },
    // [createUser.pending]: (state) => {
    //   state.isFetching = true;
    // },
    // [createUser.rejected]: (state, { payload }) => {
    //   state.isFetching = false;
    //   state.isError = true;
    //   state.errorMessage = payload.message;
    // },
  },
});

export const { clearState } = usersDataSlice.actions;
export const rentReducer = usersDataSlice.reducer;

export const usersSelector = (state) => state.users;
