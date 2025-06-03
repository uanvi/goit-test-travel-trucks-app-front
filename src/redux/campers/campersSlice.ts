import { createSlice } from '@reduxjs/toolkit';

interface Camper {
  id: string;
  name: string;
  price: number;
}

interface CampersState {
  items: Camper[];
  loading: boolean;
  error: string | null;
}

const initialState: CampersState = {
  items: [],
  loading: false,
  error: null,
};

const campersSlice = createSlice({
  name: 'campers',
  initialState,
  reducers: {
    setCampers(state, action) {
      state.items = action.payload;
    },
  },
});

export const { setCampers } = campersSlice.actions;
export default campersSlice.reducer;
