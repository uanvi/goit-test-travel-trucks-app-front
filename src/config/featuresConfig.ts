export const FEATURES_CONFIG = [
  {
    key: 'transmission',
    icon: '/src/assets/icons/transmission.svg',
    label: 'transmission',
    // filterKey видалений - не буде у фільтрах
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
    filterKey: 'AC',
  },
  {
    key: 'bathroom',
    icon: '/src/assets/icons/bathroom.svg',
    label: 'Bathroom',
    filterKey: 'bathroom',
  },
  {
    key: 'kitchen',
    icon: '/src/assets/icons/kitchen.svg',
    label: 'Kitchen',
    filterKey: 'kitchen',
  },
  {
    key: 'TV',
    icon: '/src/assets/icons/tv.svg',
    label: 'TV',
    filterKey: 'TV',
  },
  {
    key: 'radio',
    icon: '/src/assets/icons/radio.svg',
    label: 'Radio',
    filterKey: 'radio',
  },
  {
    key: 'refrigerator',
    icon: '/src/assets/icons/refrigerator.svg',
    label: 'Refrigerator',
    filterKey: 'refrigerator',
  },
  {
    key: 'microwave',
    icon: '/src/assets/icons/microwave.svg',
    label: 'Microwave',
    filterKey: 'microwave',
  },
  {
    key: 'gas',
    icon: '/src/assets/icons/gas.svg',
    label: 'Gas',
    filterKey: 'gas',
  },
  {
    key: 'water',
    icon: '/src/assets/icons/water.svg',
    label: 'Water',
    filterKey: 'water',
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
