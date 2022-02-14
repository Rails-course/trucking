import { createAsyncThunk } from '@reduxjs/toolkit';
import UserAPI from '../../api/users/UserAPI';

export const createUser = createAsyncThunk(
  'users/create',
  async (user, thunkAPI) => {
    try {
      const response = await UserAPI.createUser(user);

      const { status, data } = response;

      if (status !== 200) {
        return thunkAPI.rejectWithValue(data);
      }

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);
