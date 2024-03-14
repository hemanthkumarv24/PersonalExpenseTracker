import { createSlice } from '@reduxjs/toolkit';

export const bankSlice = createSlice({
  name: 'bank',
  initialState: {
    value: false,
  },
  reducers: {
    setBank: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setBank } = bankSlice.actions;

export const selectBank = (state) => state.bank.value;

export default bankSlice.reducer;
