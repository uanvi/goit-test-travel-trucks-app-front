import { configureStore } from '@reduxjs/toolkit';
import campersReducer from './campers/campersSlice';
import camperDetailsReducer from './camperDetails/camperDetailsSlice';

export const store = configureStore({
  reducer: {
    campers: campersReducer,
    camperDetails: camperDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
