import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getCamperById } from '../../api/campersApi';
import { Camper } from '../campers/campersSlice';
import axios from 'axios';
import { TEXTS } from '../../config/textsConfig';

interface CamperDetailsState {
  camper: Camper | null;
  loading: boolean;
  error: string | null;
}

const initialState: CamperDetailsState = {
  camper: null,
  loading: false,
  error: null,
};

// Покращений thunk з детальною обробкою помилок
export const fetchCamperDetails = createAsyncThunk<Camper, string>(
  'camperDetails/fetchById',
  async (id, thunkAPI) => {
    try {
      const data = await getCamperById(id);
      return data;
    } catch (error) {
      let errorMessage = TEXTS.errors.default;

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          errorMessage = TEXTS.errors.notFound;
        } else if (error.code === 'ECONNABORTED') {
          errorMessage = TEXTS.errors.timeout;
        } else if (
          error.response?.status === 500 ||
          error.message.toLowerCase().includes('server')
        ) {
          errorMessage = TEXTS.errors.server;
        } else if (error.message.toLowerCase().includes('network')) {
          errorMessage = TEXTS.errors.network;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);

const camperDetailsSlice = createSlice({
  name: 'camperDetails',
  initialState,
  reducers: {
    clearCamperDetails: state => {
      state.camper = null;
      state.error = null;
      state.loading = false;
    },
    // Додатковий reducer для очищення тільки помилок
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCamperDetails.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCamperDetails.fulfilled, (state, action: PayloadAction<Camper>) => {
        state.loading = false;
        state.camper = action.payload;
        state.error = null;
      })
      .addCase(fetchCamperDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.camper = null;
      });
  },
});

export const { clearCamperDetails, clearError } = camperDetailsSlice.actions;
export default camperDetailsSlice.reducer;
