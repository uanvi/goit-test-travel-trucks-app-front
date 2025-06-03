import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getCampersByPage } from '../../api/campersApi';
import { CAMPERS_PER_PAGE } from '../../config/apiConfig';

export interface Camper {
  id: string;
  name: string;
  price: number;
}

interface CampersResponse {
  items: Camper[];
  total: number;
}

interface CampersState {
  items: Camper[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  total: number;
  hasInitialized: boolean;
}

const initialState: CampersState = {
  items: [],
  loading: false,
  error: null,
  currentPage: 0,
  total: 0,
  hasInitialized: false,
};

export const fetchCampers = createAsyncThunk<CampersResponse, { page: number; reset?: boolean }>(
  'campers/fetchByPage',
  async ({ page, reset = false }, thunkAPI) => {
    try {
      const data = await getCampersByPage(page, CAMPERS_PER_PAGE);
      return { ...data, reset };
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Unknown error');
    }
  },
);

const campersSlice = createSlice({
  name: 'campers',
  initialState,
  reducers: {
    resetCampers: state => {
      state.items = [];
      state.currentPage = 0;
      state.total = 0;
      state.error = null;
      state.hasInitialized = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCampers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCampers.fulfilled,
        (state, action: PayloadAction<CampersResponse & { reset?: boolean }>) => {
          state.loading = false;
          state.hasInitialized = true;

          // Якщо це скидання або перша сторінка, замінюємо всі items
          if (action.payload.reset || state.currentPage === 0) {
            state.items = action.payload.items;
            state.currentPage = 1;
          } else {
            // Інакше додаємо до існуючих
            state.items.push(...action.payload.items);
            state.currentPage += 1;
          }

          state.total = action.payload.total;
        },
      )
      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.hasInitialized = true;
      });
  },
});

export const { resetCampers } = campersSlice.actions;
export default campersSlice.reducer;
