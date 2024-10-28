import { configureStore } from '@reduxjs/toolkit';
import appointmentReducer from './appointmentSlice';

const store = configureStore({
  reducer: {
    appointments: appointmentReducer,
  },
});

export default store;