export const FEATURES_CONFIG = [
  {
    key: 'transmission',
    icon: '/icons/transmission.svg',
    label: 'transmission',
  },
  {
    key: 'engine',
    icon: '/icons/engine.svg',
    label: 'engine',
  },
  {
    key: 'AC',
    icon: '/icons/ac.svg',
    label: 'AC',
    filterKey: 'AC', // This IS a filter
  },
  {
    key: 'bathroom',
    icon: '/icons/bathroom.svg',
    label: 'Bathroom',
    filterKey: 'bathroom', // This IS a filter
  },
  {
    key: 'kitchen',
    icon: '/icons/kitchen.svg',
    label: 'Kitchen',
    filterKey: 'kitchen', // This IS a filter
  },
  {
    key: 'TV',
    icon: '/icons/tv.svg',
    label: 'TV',
    filterKey: 'TV', // This IS a filter
  },
  {
    key: 'radio',
    icon: '/icons/radio.svg',
    label: 'Radio',
    filterKey: 'radio', // This IS a filter
  },
  {
    key: 'refrigerator',
    icon: '/icons/refrigerator.svg',
    label: 'Refrigerator',
    filterKey: 'refrigerator', // This IS a filter
  },
  {
    key: 'microwave',
    icon: '/icons/microwave.svg',
    label: 'Microwave',
    filterKey: 'microwave', // This IS a filter
  },
  {
    key: 'gas',
    icon: '/icons/gas.svg',
    label: 'Gas',
    filterKey: 'gas', // This IS a filter
  },
  {
    key: 'water',
    icon: '/icons/water.svg',
    label: 'Water',
    filterKey: 'water', // This IS a filter
  },
] as const;

export const VEHICLE_TYPES_CONFIG = [
  {
    value: 'panelTruck',
    label: 'Van',
    icon: '/icons/van.svg',
  },
  {
    value: 'fullyIntegrated',
    label: 'Fully Integrated',
    icon: '/icons/motorhome.svg',
  },
  {
    value: 'alcove',
    label: 'Alcove',
    icon: '/icons/alcove.svg',
  },
] as const;
