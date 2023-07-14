import Axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

//URLs 

const BASE_URL = 'http://localhost:3000/';

const initialState = {
    doctors: [],
    isLoading: false,
    error: null
  };

  // fetching doctors

  export const fechgDoctors = createAsyncThunk(
    'doctors/fechgDoctors',
    async () => {
      const response = await axios.get(BASE_URL);
      return response.data;
    },
  );

