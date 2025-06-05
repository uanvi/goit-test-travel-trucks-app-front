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
        <span className="location-autocomplete__icon">📍</span>
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
