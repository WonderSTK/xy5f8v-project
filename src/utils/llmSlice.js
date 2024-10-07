import { createSlice } from '@reduxjs/toolkit';

const llmSlice = createSlice({
  name: 'llm',
  initialState: {
    apiKey: '',
  },
  reducers: {
    setApiKey: (state, action) => {
      state.apiKey = action.payload;
    },
  },
});

export const { setApiKey } = llmSlice.actions;
export default llmSlice.reducer;
