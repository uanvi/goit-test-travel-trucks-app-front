import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getCampersByPage } from '../../api/campersApi';
import { CAMPERS_PER_PAGE } from '../../config/apiConfig';
import { FilterParams } from '../../components/layout/FilterSidebar/FilterSidebar';

export interface Camper {
  id: string;
  name: string;
  price: number;
  location: string;
  rating: number;
  description: string;
  gallery: { thumb: string; original: string }[];
  reviews: {
    reviewer_name: string;
    reviewer_rating: number;
    comment: string;
  }[];
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: string;
  engine: string;
  AC: boolean;
  bathroom: boolean;
  kitchen: boolean;
  TV: boolean;
  radio: boolean;
  refrigerator: boolean;
  microwave: boolean;
  gas: boolean;
  water: boolean;
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
  activeFilters: FilterParams | null;
  isFiltered: boolean;
}

const initialState: CampersState = {
  items: [],
  loading: false,
  error: null,
  currentPage: 0,
  total: 0,
  hasInitialized: false,
  activeFilters: null,
  isFiltered: false,
};

export const fetchCampers = createAsyncThunk<
  CampersResponse,
  { page: number; reset?: boolean; filters?: FilterParams }
>('campers/fetchByPage', async ({ page, reset = false, filters }, thunkAPI) => {
  try {
    const data = await getCampersByPage(page, CAMPERS_PER_PAGE, filters);
    return { ...data, reset, filters };
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue('Unknown error');
  }
});

export const applyFilters = createAsyncThunk<CampersResponse, FilterParams>(
  'campers/applyFilters',
  async (filters, thunkAPI) => {
    try {
      const data = await getCampersByPage(1, CAMPERS_PER_PAGE, filters);
      return { ...data, filters };
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Unknown error');
    }
  },
);

export const loadMoreWithFilters = createAsyncThunk<
  CampersResponse,
  number,
  { state: { campers: CampersState } }
>('campers/loadMoreWithFilters', async (page, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const filters = state.campers.activeFilters;

    const data = await getCampersByPage(page, CAMPERS_PER_PAGE, filters || undefined);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue('Unknown error');
  }
});

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
      state.activeFilters = null;
      state.isFiltered = false;
    },

    clearFilters: state => {
      state.activeFilters = null;
      state.isFiltered = false;
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
        (
          state,
          action: PayloadAction<CampersResponse & { reset?: boolean; filters?: FilterParams }>,
        ) => {
          state.loading = false;
          state.hasInitialized = true;

          if (action.payload.reset || state.currentPage === 0) {
            state.items = action.payload.items;
            state.currentPage = 1;
          } else {
            state.items.push(...action.payload.items);
            state.currentPage += 1;
          }

          state.total = action.payload.total;

          if (action.payload.filters) {
            state.activeFilters = action.payload.filters;
            state.isFiltered = true;
          }
        },
      )
      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.hasInitialized = true;
      })

      .addCase(applyFilters.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        applyFilters.fulfilled,
        (state, action: PayloadAction<CampersResponse & { filters?: FilterParams }>) => {
          state.loading = false;
          state.items = action.payload.items;
          state.currentPage = 1;
          state.total = action.payload.total;
          state.hasInitialized = true;

          // Save applied filters
          if (action.payload.filters) {
            state.activeFilters = action.payload.filters;
            state.isFiltered = true;
          }
        },
      )
      .addCase(applyFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(loadMoreWithFilters.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMoreWithFilters.fulfilled, (state, action: PayloadAction<CampersResponse>) => {
        state.loading = false;
        state.items.push(...action.payload.items);
        state.currentPage += 1;
        state.total = action.payload.total;
      })
      .addCase(loadMoreWithFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetCampers, clearFilters } = campersSlice.actions;
export default campersSlice.reducer;
