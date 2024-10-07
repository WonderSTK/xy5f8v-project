import { createSlice } from '@reduxjs/toolkit';

const inputSlice = createSlice({
  name: 'input',
  initialState: {
    prompt: '',
  },
  reducers: {
    setPrompt: (state, action) => {
      state.prompt = action.payload;
    },
  },
});

export const { setPrompt } = inputSlice.actions;
export default inputSlice.reducer;
