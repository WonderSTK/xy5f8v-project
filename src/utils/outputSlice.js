import { createSlice } from '@reduxjs/toolkit';

const outputSlice = createSlice({
  name: 'output',
  initialState: {
    response: '',
  },
  reducers: {
    setResponse: (state, action) => {
      state.response = action.payload;
    },
    clearResponse: (state) => {
      state.response = '';
    },
  },
});

export const { setResponse, clearResponse } = outputSlice.actions;
export default outputSlice.reducer;
