import { configureStore } from '@reduxjs/toolkit';
import campersReducer from './campersSlice';

export const store = configureStore({
  reducer: {
    campers: campersReducer,
  },
});

//hooks types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
