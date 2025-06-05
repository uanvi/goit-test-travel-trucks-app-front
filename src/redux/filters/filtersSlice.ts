// src/redux/filters/filtersSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
  location: string;
  form: string;
  equipment: {
    AC: boolean;
    transmission: string;
    kitchen: boolean;
    TV: boolean;
    bathroom: boolean;
    refrigerator: boolean;
    microwave: boolean;
    gas: boolean;
    water: boolean;
    radio: boolean;
  };
  isActive: boolean; // Чи застосовані якісь фільтри
}

const initialState: FilterState = {
  location: '',
  form: '',
  equipment: {
    AC: false,
    transmission: '',
    kitchen: false,
    TV: false,
    bathroom: false,
    refrigerator: false,
    microwave: false,
    gas: false,
    water: false,
    radio: false,
  },
  isActive: false,
};

// Допоміжна функція для перевірки чи активні фільтри
const checkIfFiltersActive = (state: FilterState): boolean => {
  // Перевіряємо локацію та форму
  if (state.location.trim() || state.form) return true;

  // Перевіряємо обладнання
  const equipmentValues = Object.values(state.equipment);
  return equipmentValues.some(
    value => value === true || (typeof value === 'string' && value.trim()),
  );
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
      state.isActive = checkIfFiltersActive(state);
    },

    setForm: (state, action: PayloadAction<string>) => {
      state.form = action.payload;
      state.isActive = checkIfFiltersActive(state);
    },

    setEquipment: (
      state,
      action: PayloadAction<{ key: keyof FilterState['equipment']; value: boolean | string }>,
    ) => {
      const { key, value } = action.payload;
      state.equipment[key] = value as never; // TypeScript hack для union types
      state.isActive = checkIfFiltersActive(state);
    },

    setAllFilters: (state, action: PayloadAction<Omit<FilterState, 'isActive'>>) => {
      state.location = action.payload.location;
      state.form = action.payload.form;
      state.equipment = action.payload.equipment;
      state.isActive = checkIfFiltersActive(state);
    },

    resetFilters: state => {
      state.location = '';
      state.form = '';
      state.equipment = {
        AC: false,
        transmission: '',
        kitchen: false,
        TV: false,
        bathroom: false,
        refrigerator: false,
        microwave: false,
        gas: false,
        water: false,
        radio: false,
      };
      state.isActive = false;
    },
  },
});

export const { setLocation, setForm, setEquipment, setAllFilters, resetFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;
