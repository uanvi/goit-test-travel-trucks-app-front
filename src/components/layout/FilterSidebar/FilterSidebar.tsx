import React, { useState, useCallback } from 'react';
import LocationAutocomplete from '../../forms/LocationAutocomplete/LocationAutocomplete';
import MainButton from '../../common/MainButton/MainButton';
import Icon from '../../common/Icon/Icon';
import { getFilterableFeatures, getVehicleTypes } from '../../../utils/featuresUtils';
import { TEXTS } from '../../../config/textsConfig';
import './FilterSidebar.css';

export interface FilterParams {
  location: string;
  form: string;
  equipment: {
    [key: string]: boolean;
    AC: boolean;
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

const INITIAL_FILTERS: FilterParams = {
  location: '',
  form: '',
  equipment: {
    AC: false,
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

interface FilterSidebarProps {
  onFilterChange: (filters: FilterParams) => void;
  isLoading?: boolean;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onFilterChange, isLoading = false }) => {
  const [filters, setFilters] = useState<FilterParams>(INITIAL_FILTERS);

  const filterableFeatures = getFilterableFeatures();
  const vehicleTypes = getVehicleTypes();

  const handleLocationChange = useCallback(
    (value: string) => {
      const newFilters = { ...filters, location: value };
      setFilters(newFilters);
    },
    [filters],
  );

  const handleFormChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newFilters = { ...filters, form: e.target.value };
      setFilters(newFilters);
    },
    [filters],
  );

  const handleEquipmentChange = useCallback(
    (key: string, value: boolean) => {
      const newFilters = {
        ...filters,
        equipment: { ...filters.equipment, [key]: value },
      };
      setFilters(newFilters);
    },
    [filters],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onFilterChange(filters);
    },
    [filters, onFilterChange],
  );

  const handleReset = useCallback(() => {
    setFilters(INITIAL_FILTERS);
    onFilterChange(INITIAL_FILTERS);
  }, [onFilterChange]);

  return (
    <aside className="filter-sidebar">
      <form onSubmit={handleSubmit} className="filter-sidebar__form">
        <div className="filter-sidebar__section">
          <label className="filter-sidebar__label">{TEXTS.filterSidebar.locationLabel}</label>
          <LocationAutocomplete
            value={filters.location}
            onChange={handleLocationChange}
            placeholder={TEXTS.filterSidebar.locationPlaceholder}
            disabled={isLoading}
          />
        </div>

        <h3 className="filter-sidebar__title">{TEXTS.filterSidebar.filtersTitle}</h3>

        <div className="filter-sidebar__section">
          <h4 className="filter-sidebar__subtitle">{TEXTS.filterSidebar.vehicleEquipment}</h4>
          <div className="filter-sidebar__divider"></div>

          <div className="filter-sidebar__equipment-grid">
            {filterableFeatures.map(({ filterKey, key, label }) =>
              filterKey ? (
                <label key={filterKey} className="filter-sidebar__equipment-item">
                  <input
                    type="checkbox"
                    checked={filters.equipment[filterKey]}
                    onChange={e => handleEquipmentChange(filterKey, e.target.checked)}
                    className="filter-sidebar__checkbox"
                    disabled={isLoading}
                  />
                  <div className="filter-sidebar__equipment-content">
                    <Icon
                      name={key.toLowerCase() as any}
                      size="medium"
                      className="filter-sidebar__equipment-icon"
                    />
                    <span className="filter-sidebar__equipment-label">{label}</span>
                  </div>
                </label>
              ) : null,
            )}
          </div>
        </div>

        <div className="filter-sidebar__section">
          <h4 className="filter-sidebar__subtitle">{TEXTS.filterSidebar.vehicleType}</h4>
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

        <div className="filter-sidebar__actions">
          <MainButton type="submit" size="default" disabled={isLoading}>
            {isLoading ? TEXTS.buttons.searching : TEXTS.buttons.search}
          </MainButton>

          <MainButton variant="secondary" size="default" onClick={handleReset} disabled={isLoading}>
            {TEXTS.buttons.resetFilters}
          </MainButton>
        </div>
      </form>
    </aside>
  );
};

export default FilterSidebar;
