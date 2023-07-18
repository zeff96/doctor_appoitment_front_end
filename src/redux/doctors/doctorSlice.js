import Axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const BASE_URL = 'http://127.0.0.1:3000/doctors';

const initialState = {
  doctors: [],
  status: 'idle',
  error: null,
};

// create a new doctors

export const createDoctor = createAsyncThunk('doctors/createDoctor', async (data) => {
  const response = await Axios.post(`${BASE_URL}/doctors`, data);
  return response.data;
});

// fetch doctors
export const fechDoctors = createAsyncThunk('doctors/fechDoctors', async () => {
  const response = await Axios.get(BASE_URL);
  return response.data;
});

export const showDoctors = createAsyncThunk('doctors/showDoctors', async (id) => {
  const response = await Axios.get(`${BASE_URL}/${id}`);
  return response.data;
});

const doctorsSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fechDoctors.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fechDoctors.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.doctors = action.payload;
    });
    builder.addCase(fechDoctors.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    }); // ---------------------------------------//
    builder.addCase(showDoctors.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(showDoctors.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.doctors = action.payload;
    });
    builder.addCase(showDoctors.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    // create a new Doctors
    builder.addCase(createDoctor.pending, (state) => ({
      ...state,
      status: 'loading',
    }));
    builder.addCase(createDoctor.fulfilled, (state) => ({
      ...state,
      status: 'successful',
      doctors: state.doctors.concat(action.payload),

    }));
    builder.addCase(createDoctor.rejected, (state, action) => ({
      ...state,
      status: 'failed',
      error: action.error.message,
      isSuccessfull: false,
    }));
  },
});

export const { selectDoctor } = doctorsSlice.actions;
export default doctorsSlice.reducer;
