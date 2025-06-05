export const FEATURES_CONFIG = [
  { key: 'transmission', icon: '⚙️', label: 'transmission', filterKey: 'transmission' },
  { key: 'engine', icon: '⛽', label: 'engine' },
  { key: 'AC', icon: '❄️', label: 'AC', filterKey: 'AC' },
  { key: 'bathroom', icon: '🚿', label: 'Bathroom', filterKey: 'bathroom' },
  { key: 'kitchen', icon: '🍳', label: 'Kitchen', filterKey: 'kitchen' },
  { key: 'TV', icon: '📺', label: 'TV', filterKey: 'TV' },
  { key: 'radio', icon: '📻', label: 'Radio', filterKey: 'radio' },
  { key: 'refrigerator', icon: '🧊', label: 'Refrigerator', filterKey: 'refrigerator' },
  { key: 'microwave', icon: '🔥', label: 'Microwave', filterKey: 'microwave' },
  { key: 'gas', icon: '🔥', label: 'Gas', filterKey: 'gas' },
  { key: 'water', icon: '💧', label: 'Water', filterKey: 'water' },
] as const;

export const VEHICLE_TYPES_CONFIG = [
  { value: 'panelTruck', label: 'Van', icon: '🚐' },
  { value: 'fullyIntegrated', label: 'Fully Integrated', icon: '🚌' },
  { value: 'alcove', label: 'Alcove', icon: '🏠' },
] as const;
