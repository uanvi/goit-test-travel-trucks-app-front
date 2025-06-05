// src/utils/featuresUtils.ts
import { Camper } from '../redux/campers/campersSlice';

export interface Feature {
  key: keyof Camper;
  icon: string;
  label: string;
  condition?: boolean;
}

export const getFeatureConfig = (camper: Camper): Feature[] => [
  { key: 'transmission', icon: '⚙️', label: camper.transmission },
  { key: 'engine', icon: '⛽', label: camper.engine },
  { key: 'AC', icon: '❄️', label: 'AC', condition: camper.AC },
  { key: 'bathroom', icon: '🚿', label: 'Bathroom', condition: camper.bathroom },
  { key: 'kitchen', icon: '🍳', label: 'Kitchen', condition: camper.kitchen },
  { key: 'TV', icon: '📺', label: 'TV', condition: camper.TV },
  { key: 'radio', icon: '📻', label: 'Radio', condition: camper.radio },
  { key: 'refrigerator', icon: '🧊', label: 'Refrigerator', condition: camper.refrigerator },
  { key: 'microwave', icon: '🔥', label: 'Microwave', condition: camper.microwave },
  { key: 'gas', icon: '🔥', label: 'Gas', condition: camper.gas },
  { key: 'water', icon: '💧', label: 'Water', condition: camper.water },
];

export const getAvailableFeatures = (camper: Camper): Feature[] => {
  return getFeatureConfig(camper).filter(
    feature => feature.condition !== false && (feature.condition === true || feature.label),
  );
};

export const getDisplayFeatures = (camper: Camper, maxCount = 6): Feature[] => {
  return getAvailableFeatures(camper).slice(0, maxCount);
};
