import { configureStore } from '@reduxjs/toolkit';
import inputReducer from './inputSlice';
import llmReducer from './llmSlice';
import outputReducer from './outputSlice';

const store = configureStore({
  reducer: {
    input: inputReducer,
    llm: llmReducer,
    output: outputReducer,
  },
});

export default store;
