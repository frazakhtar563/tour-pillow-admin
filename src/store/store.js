import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducers/counterSlice';
import tourReducer from './reducers/tours';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    tours:tourReducer
  },
});
