// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  username: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.userId = action.payload.UserID;
      state.username = action.payload.Username;
    },
    logout: (state) => {
      state.userId = null;
      state.username = '';
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
