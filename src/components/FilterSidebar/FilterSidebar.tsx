// src/components/FilterSidebar/FilterSidebar.tsx
import React, { useState } from 'react';
import LocationAutocomplete from '../LocationAutocomplete/LocationAutocomplete';
import MainButton from '../MainButton/MainButton';
import './FilterSidebar.css';

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

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onFilterChange, isLoading = false }) => {
  const [filters, setFilters] = useState<FilterParams>({
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
  });

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
    const resetFilters: FilterParams = {
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
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const vehicleTypes = [
    { value: 'panelTruck', label: 'Van', icon: '🚐' },
    { value: 'fullyIntegrated', label: 'Fully Integrated', icon: '🚌' },
    { value: 'alcove', label: 'Alcove', icon: '🏠' },
  ];

  const equipmentOptions = [
    { key: 'AC' as const, label: 'AC', icon: '❄️' },
    { key: 'transmission' as const, label: 'Automatic', icon: '⚙️' },
    { key: 'kitchen' as const, label: 'Kitchen', icon: '🍳' },
    { key: 'TV' as const, label: 'TV', icon: '📺' },
    { key: 'bathroom' as const, label: 'Bathroom', icon: '🚿' },
    { key: 'refrigerator' as const, label: 'Refrigerator', icon: '🧊' },
    { key: 'microwave' as const, label: 'Microwave', icon: '🔥' },
    { key: 'gas' as const, label: 'Gas', icon: '🔥' },
    { key: 'water' as const, label: 'Water', icon: '💧' },
    { key: 'radio' as const, label: 'Radio', icon: '📻' },
  ];

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
            {equipmentOptions.map(option => (
              <label key={option.key} className="filter-sidebar__equipment-item">
                <input
                  type="checkbox"
                  checked={
                    option.key === 'transmission'
                      ? filters.equipment.transmission === 'automatic'
                      : !!filters.equipment[option.key]
                  }
                  onChange={e => {
                    if (option.key === 'transmission') {
                      handleEquipmentChange('transmission', e.target.checked ? 'automatic' : '');
                    } else {
                      handleEquipmentChange(option.key, e.target.checked);
                    }
                  }}
                  className="filter-sidebar__checkbox"
                  disabled={isLoading}
                />
                <div className="filter-sidebar__equipment-content">
                  <span className="filter-sidebar__equipment-icon">{option.icon}</span>
                  <span className="filter-sidebar__equipment-label">{option.label}</span>
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
                  <span className="filter-sidebar__vehicle-icon">{type.icon}</span>
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
