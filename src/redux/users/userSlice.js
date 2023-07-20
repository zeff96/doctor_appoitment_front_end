import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  userData: null,
  isAuthenticated: false,
};

const url = ' http://localhost:3000';

export const signUpAsync = createAsyncThunk(
  'signup/Async',
  async (FormData) => {
    const res = await axios.post(`${url}/signup`, FormData, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    localStorage.setItem('token', res.headers.get('Authorization'));
    return res.data;
  },
);

export const loginAsync = createAsyncThunk(
  'login/Async',
  async (formData) => {
    const res = await axios.post(`${url}/login`, formData, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    localStorage.setItem('token', res.headers.get('Authorization'));
    return res.data;
  },
);

export const logoutAsync = createAsyncThunk(
  'logout/Async',
  async () => {
    const res = await axios.delete(`${url}/logout`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    });
    localStorage.removeItem('token');
    return res.data;
  },
);

const userSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers(builder) {
    builder.addCase(signUpAsync.fulfilled, (state, action) => ({
      ...state,
      userData: action.payload,
    })).addCase(loginAsync.fulfilled, (state, action) => ({
      ...state,
      userData: action.payload,
      isAuthenticated: true,
    })).addCase(logoutAsync.fulfilled, (state) => ({
      ...state,
      userData: null,
      isAuthenticated: false,
    }));
  },
});
export default userSlice.reducer;
