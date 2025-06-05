// src/redux/campers/campersSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getCampersByPage } from '../../api/campersApi';
import { CAMPERS_PER_PAGE } from '../../config/apiConfig';
import { FilterState } from '../filters/filtersSlice';

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
  activeFilters: FilterState | null; // Зберігаємо поточні фільтри
  isFiltered: boolean; // Чи застосовані фільтри
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

// Оновлений thunk з підтримкою фільтрів
export const fetchCampers = createAsyncThunk<
  CampersResponse,
  { page: number; reset?: boolean; filters?: FilterState }
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

// Новий thunk для застосування фільтрів
export const applyFilters = createAsyncThunk<CampersResponse, FilterState>(
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

// Thunk для завантаження наступної сторінки з поточними фільтрами
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
      // Звичайне завантаження кемперів
      .addCase(fetchCampers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCampers.fulfilled,
        (
          state,
          action: PayloadAction<CampersResponse & { reset?: boolean; filters?: FilterState }>,
        ) => {
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

          // Оновлюємо інформацію про фільтри
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

      // Застосування фільтрів
      .addCase(applyFilters.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        applyFilters.fulfilled,
        (state, action: PayloadAction<CampersResponse & { filters?: FilterState }>) => {
          state.loading = false;
          state.items = action.payload.items;
          state.currentPage = 1;
          state.total = action.payload.total;
          state.hasInitialized = true;

          // Зберігаємо застосовані фільтри
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

      // Завантаження більше з фільтрами
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
