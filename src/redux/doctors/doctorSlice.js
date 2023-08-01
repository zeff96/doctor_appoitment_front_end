import Axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const BASE_URL = 'https://doctor-api-3dvk.onrender.com/doctors';

const initialState = {
  doctors: [],
  details: [],
  appointments: [],
  status: 'idle',
  error: null,
};

// create a new doctors

export const createDoctor = createAsyncThunk('doctors/createDoctor', async (data) => {
  const response = await Axios.post(BASE_URL, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      Authorization: Cookies.get('jwt_token'),
    },
  });
  return response.data;
});

// fetch doctors
export const fechDoctors = createAsyncThunk('doctors/fechDoctors', async () => {
  const response = await Axios.get(BASE_URL, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: Cookies.get('jwt_token'),
    },
  });
  return response.data;
});

// fetch doctors details
export const showDoctors = createAsyncThunk('doctors/showDoctors', async (id) => {
  const response = await Axios.get(`${BASE_URL}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: Cookies.get('jwt_token'),
    },
  });
  return response.data;
});

export const deleteDoctor = createAsyncThunk('doctor/deleteDoctor', async (id) => {
  const res = await Axios.delete(`${BASE_URL}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: Cookies.get('jwt_token'),
    },
  });
  return res.data;
});

export const createAppointment = createAsyncThunk('doctors/createAppointment', async (data) => {
  const response = await Axios.post(`${BASE_URL}/${data.id}/appointments`, data, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: Cookies.get('jwt_token'),
    },
  });
  return response.data;
});

export const fetchAppointments = createAsyncThunk('doctors/fetchAppointments', async () => {
  const response = await Axios.get('https://doctor-api-3dvk.onrender.com/appointments', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: Cookies.get('jwt_token'),
    },
  });
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
    });
    // Fetch doctor details data //
    builder.addCase(showDoctors.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(showDoctors.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.details = action.payload;
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
    builder.addCase(createDoctor.fulfilled, (state, action) => ({
      ...state,
      status: 'successful',
      doctors: state.doctors.concat(action.payload),

    }));
    builder.addCase(createDoctor.rejected, (state, action) => ({
      ...state,
      status: 'failed',
      error: action.error.message,
      isSuccessfull: false,
    })).addCase(deleteDoctor.pending, (state) => ({
      ...state,
      status: 'Loading',
    })).addCase(deleteDoctor.fulfilled, (state) => ({
      ...state,
      status: 'success',
    })).addCase(deleteDoctor.rejected, (state, action) => ({
      ...state,
      error: action.error.message,
    }));
    // create a appointment //
    builder.addCase(createAppointment.pending, (state) => ({
      ...state,
      status: 'loading',
    }));
    builder.addCase(createAppointment.fulfilled, (state, action) => ({
      ...state,
      status: 'successful',
      appointment: state.appointments.concat(action.payload),

    }));
    builder.addCase(createAppointment.rejected, (state, action) => ({
      ...state,
      status: 'failed',
      error: action.error.message,
      isSuccessfull: false,
    }));
    // Fetch Appointments data //
    builder.addCase(fetchAppointments.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchAppointments.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.appointments = action.payload;
    });
    builder.addCase(fetchAppointments.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export default doctorsSlice.reducer;
