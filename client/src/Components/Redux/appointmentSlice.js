// src/store/appointmentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Fetch all appointments
export const fetchAppointments = createAsyncThunk(
    'appointments/fetchAppointments',
    async () => {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:5000/app/allappointments', {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      return response.data;
    }
  );

// Add a new appointment
export const addAppointment = createAsyncThunk(
  'appointments/addAppointment',
  async (newAppointment, { getState }) => {
    const authToken = localStorage.getItem("authToken"); // Assuming you have authToken in your auth slice
    const response = await axios.post('http://localhost:5000/app/offline-book', newAppointment, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });
    toast.success("Appointment Added Successfully");
    return response.data; // Assuming the server returns the added appointment
  }
);

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState: {
    appointments: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.appointments = action.payload; 
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        toast.error("Failed to fetch appointments");
      })
      .addCase(addAppointment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addAppointment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.appointments.push(action.payload); 
      })
      .addCase(addAppointment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        toast.error("Failed to add appointment");
      });
  },
});

export default appointmentSlice.reducer;