import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

import jobReducer from './JobSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    job: jobReducer,
  },
});




// Define the RootState type
export type RootState = ReturnType<typeof store.getState>;

// Define the AppDispatch type
export type AppDispatch = typeof store.dispatch;

export default store;