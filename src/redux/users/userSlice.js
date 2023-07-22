import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const initialState = {
  userData: null,
  isAuthenticated: false,
  error: null,
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
    const token = res.headers.get('Authorization');
    const expirationTimeInMinutes = 10;
    Cookies.set('jwt_token', token, { expires: expirationTimeInMinutes });
    return res.data;
  },
);

export const loginAsync = createAsyncThunk(
  'login/Async',
  async (formData) => {
    try {
      const res = await axios.post(`${url}/login`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const token = res.headers.get('Authorization');
      const expirationTimeInMinutes = 10;
      Cookies.set('jwt_token', token, { expires: expirationTimeInMinutes });
      return res.data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.status.message) {
        throw new Error(error.response.data.status.message);
      } else {
        throw new Error('An unknown error occurred.');
      }
    }
  },
);

export const logoutAsync = createAsyncThunk(
  'logout/Async',
  async () => {
    const res = await axios.delete(`${url}/logout`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: Cookies.get('jwt_token'),
      },
    });
    Cookies.remove('jwt_token');
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
    })).addCase(loginAsync.rejected, (state, action) => ({
      ...state,
      isAuthenticated: false,
      error: action.error.message,
    })).addCase(logoutAsync.fulfilled, (state) => ({
      ...state,
      userData: null,
      isAuthenticated: false,
    }));
  },
});
export default userSlice.reducer;
