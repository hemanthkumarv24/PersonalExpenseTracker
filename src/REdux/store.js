import { configureStore } from '@reduxjs/toolkit';
import bankReducer from './bankSlice';
import authReducer from './authSlice';

export default configureStore({
  reducer: {
    bank: bankReducer,
    auth: authReducer,
  },
});
