export const FEATURES_CONFIG = [
  {
    key: 'transmission',
    icon: '/src/assets/icons/transmission.svg',
    label: 'transmission',
  },
  {
    key: 'engine',
    icon: '/src/assets/icons/engine.svg',
    label: 'engine',
  },
  {
    key: 'AC',
    icon: '/src/assets/icons/ac.svg',
    label: 'AC',
    filterKey: 'AC', // This IS a filter
  },
  {
    key: 'bathroom',
    icon: '/src/assets/icons/bathroom.svg',
    label: 'Bathroom',
    filterKey: 'bathroom', // This IS a filter
  },
  {
    key: 'kitchen',
    icon: '/src/assets/icons/kitchen.svg',
    label: 'Kitchen',
    filterKey: 'kitchen', // This IS a filter
  },
  {
    key: 'TV',
    icon: '/src/assets/icons/tv.svg',
    label: 'TV',
    filterKey: 'TV', // This IS a filter
  },
  {
    key: 'radio',
    icon: '/src/assets/icons/radio.svg',
    label: 'Radio',
    filterKey: 'radio', // This IS a filter
  },
  {
    key: 'refrigerator',
    icon: '/src/assets/icons/refrigerator.svg',
    label: 'Refrigerator',
    filterKey: 'refrigerator', // This IS a filter
  },
  {
    key: 'microwave',
    icon: '/src/assets/icons/microwave.svg',
    label: 'Microwave',
    filterKey: 'microwave', // This IS a filter
  },
  {
    key: 'gas',
    icon: '/src/assets/icons/gas.svg',
    label: 'Gas',
    filterKey: 'gas', // This IS a filter
  },
  {
    key: 'water',
    icon: '/src/assets/icons/water.svg',
    label: 'Water',
    filterKey: 'water', // This IS a filter
  },
] as const;

export const VEHICLE_TYPES_CONFIG = [
  {
    value: 'panelTruck',
    label: 'Van',
    icon: '/src/assets/icons/van.svg',
  },
  {
    value: 'fullyIntegrated',
    label: 'Fully Integrated',
    icon: '/src/assets/icons/motorhome.svg',
  },
  {
    value: 'alcove',
    label: 'Alcove',
    icon: '/src/assets/icons/alcove.svg',
  },
] as const;
