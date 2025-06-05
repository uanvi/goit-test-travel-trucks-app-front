import React, { useState } from 'react';
import LocationAutocomplete from '../LocationAutocomplete/LocationAutocomplete';
import MainButton from '../MainButton/MainButton';
import Icon from '../Icon/Icon';
import { getFilterableFeatures, getVehicleTypes } from '../../utils/featuresUtils';
import './FilterSidebar.css';

// Локальний інтерфейс для FilterSidebar (не пов'язаний з Redux)
export interface FilterParams {
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
}

interface FilterSidebarProps {
  onFilterChange: (filters: FilterParams) => void;
  isLoading?: boolean;
}

// Початкові значення фільтрів
const initialFilters: FilterParams = {
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
};

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onFilterChange, isLoading = false }) => {
  // Локальний стан фільтрів (не пов'язаний з Redux)
  const [filters, setFilters] = useState<FilterParams>(initialFilters);

  // ✅ Отримуємо особливості та типи через утиліти
  const filterableFeatures = getFilterableFeatures();
  const vehicleTypes = getVehicleTypes();

  const handleLocationChange = (value: string) => {
    const newFilters = { ...filters, location: value };
    setFilters(newFilters);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, form: e.target.value };
    setFilters(newFilters);
  };

  const handleEquipmentChange = (key: keyof typeof filters.equipment, value: boolean | string) => {
    const newFilters = {
      ...filters,
      equipment: { ...filters.equipment, [key]: value },
    };
    setFilters(newFilters);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  const handleReset = () => {
    setFilters(initialFilters);
    onFilterChange(initialFilters);
  };

  return (
    <aside className="filter-sidebar">
      <form onSubmit={handleSubmit} className="filter-sidebar__form">
        {/* Location Filter */}
        <div className="filter-sidebar__section">
          <label className="filter-sidebar__label">Location</label>
          <LocationAutocomplete
            value={filters.location}
            onChange={handleLocationChange}
            placeholder="City, Country"
            disabled={isLoading}
          />
        </div>

        {/* Filters Title */}
        <h3 className="filter-sidebar__title">Filters</h3>

        {/* Vehicle Equipment */}
        <div className="filter-sidebar__section">
          <h4 className="filter-sidebar__subtitle">Vehicle equipment</h4>
          <div className="filter-sidebar__divider"></div>

          <div className="filter-sidebar__equipment-grid">
            {filterableFeatures.map(feature => (
              <label key={feature.filterKey} className="filter-sidebar__equipment-item">
                <input
                  type="checkbox"
                  checked={
                    feature.filterKey === 'transmission'
                      ? filters.equipment.transmission === 'automatic'
                      : !!(filters.equipment as any)[feature.filterKey!]
                  }
                  onChange={e => {
                    if (feature.filterKey === 'transmission') {
                      handleEquipmentChange('transmission', e.target.checked ? 'automatic' : '');
                    } else {
                      handleEquipmentChange(
                        feature.filterKey as keyof typeof filters.equipment,
                        e.target.checked,
                      );
                    }
                  }}
                  className="filter-sidebar__checkbox"
                  disabled={isLoading}
                />
                <div className="filter-sidebar__equipment-content">
                  <Icon
                    name={feature.key.toLowerCase() as any}
                    size="medium"
                    className="filter-sidebar__equipment-icon"
                  />
                  <span className="filter-sidebar__equipment-label">
                    {feature.filterKey === 'transmission' ? 'Automatic' : feature.label}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Vehicle Type */}
        <div className="filter-sidebar__section">
          <h4 className="filter-sidebar__subtitle">Vehicle type</h4>
          <div className="filter-sidebar__divider"></div>

          <div className="filter-sidebar__vehicle-grid">
            {vehicleTypes.map(type => (
              <label key={type.value} className="filter-sidebar__vehicle-item">
                <input
                  type="radio"
                  name="vehicleType"
                  value={type.value}
                  checked={filters.form === type.value}
                  onChange={handleFormChange}
                  className="filter-sidebar__radio"
                  disabled={isLoading}
                />
                <div className="filter-sidebar__vehicle-content">
                  <Icon
                    name={type.value as any}
                    size="medium"
                    className="filter-sidebar__vehicle-icon"
                  />
                  <span className="filter-sidebar__vehicle-label">{type.label}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="filter-sidebar__actions">
          <MainButton type="submit" size="default" disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
          </MainButton>

          <MainButton variant="secondary" size="default" onClick={handleReset} disabled={isLoading}>
            Reset filters
          </MainButton>
        </div>
      </form>
    </aside>
  );
};

export default FilterSidebar;
