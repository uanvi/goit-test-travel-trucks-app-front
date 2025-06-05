// src/components/LocationAutocomplete/LocationAutocomplete.tsx
import React, { useState, useEffect, useRef } from 'react';
import { getUniqueLocations } from '../../api/campersApi';
import './LocationAutocomplete.css';

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
  value,
  onChange,
  placeholder = 'City, Country',
  disabled = false,
}) => {
  const [locations, setLocations] = useState<string[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Завантажуємо список локацій при монтажі
  useEffect(() => {
    const loadLocations = async () => {
      try {
        const uniqueLocations = await getUniqueLocations();
        setLocations(uniqueLocations);
      } catch (error) {
        console.error('Failed to load locations:', error);
      }
    };

    loadLocations();
  }, []);

  // Фільтруємо локації при зміні значення
  useEffect(() => {
    if (!value.trim()) {
      setFilteredLocations([]);
      setIsOpen(false);
      return;
    }

    const filtered = locations.filter(location =>
      location.toLowerCase().includes(value.toLowerCase()),
    );

    setFilteredLocations(filtered);
    setIsOpen(filtered.length > 0);
    setHighlightedIndex(-1);
  }, [value, locations]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleSelectLocation = (location: string) => {
    onChange(location);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filteredLocations.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => (prev < filteredLocations.length - 1 ? prev + 1 : 0));
        break;

      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => (prev > 0 ? prev - 1 : filteredLocations.length - 1));
        break;

      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleSelectLocation(filteredLocations[highlightedIndex]);
        }
        break;

      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    // Затримка для дозволу кліку по опції
    setTimeout(() => {
      if (!e.currentTarget.contains(document.activeElement)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    }, 150);
  };

  return (
    <div className="location-autocomplete" onBlur={handleBlur}>
      <div className="location-autocomplete__input-wrapper">
        <span className="location-autocomplete__icon">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M19.7712 0.141029C19.8428 0.199699 19.9005 0.273527 19.94 0.357185C19.9796 0.440842 20.0001 0.53224 20 0.624779V18.1248C19.9999 18.2692 19.9498 18.4092 19.8582 18.5208C19.7666 18.6325 19.6391 18.709 19.4975 18.7373L13.2475 19.9873C13.1666 20.0034 13.0834 20.0034 13.0025 19.9873L6.875 18.7623L0.7475 19.9873C0.656861 20.0054 0.563332 20.0032 0.473651 19.9808C0.38397 19.9584 0.30037 19.9164 0.228874 19.8578C0.157378 19.7993 0.0997667 19.7255 0.0601897 19.642C0.0206127 19.5585 5.58159e-05 19.4672 0 19.3748L0 1.87478C8.72276e-05 1.73035 0.0501951 1.5904 0.141804 1.47874C0.233413 1.36708 0.360869 1.29059 0.5025 1.26228L6.7525 0.0122789C6.83337 -0.00388454 6.91663 -0.00388454 6.9975 0.0122789L13.125 1.23728L19.2525 0.0122789C19.3431 -0.00595135 19.4366 -0.00385945 19.5263 0.0184039C19.616 0.0406672 19.6997 0.0825478 19.7712 0.141029ZM12.5 2.38728L7.5 1.38728V17.6123L12.5 18.6123V2.38728ZM13.75 18.6123L18.75 17.6123V1.38728L13.75 2.38728V18.6123ZM6.25 17.6123V1.38728L1.25 2.38728V18.6123L6.25 17.6123Z" />
          </svg>
        </span>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="location-autocomplete__input"
          disabled={disabled}
          autoComplete="off"
        />
      </div>

      {isOpen && filteredLocations.length > 0 && (
        <ul ref={listRef} className="location-autocomplete__list">
          {filteredLocations.map((location, index) => (
            <li
              key={location}
              className={`location-autocomplete__item ${
                index === highlightedIndex ? 'location-autocomplete__item--highlighted' : ''
              }`}
              onMouseDown={() => handleSelectLocation(location)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              <span className="location-autocomplete__item-icon">📍</span>
              <span className="location-autocomplete__item-text">{location}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationAutocomplete;
