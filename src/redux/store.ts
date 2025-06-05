// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import campersReducer from './campers/campersSlice';
import camperDetailsReducer from './camperDetails/camperDetailsSlice';
import filtersReducer from './filters/filtersSlice';

export const store = configureStore({
  reducer: {
    campers: campersReducer,
    camperDetails: camperDetailsReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
