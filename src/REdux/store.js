import { configureStore } from '@reduxjs/toolkit';
import bankReducer from './bankSlice';

export default configureStore({
  reducer: {
    bank: bankReducer,
  },
});
