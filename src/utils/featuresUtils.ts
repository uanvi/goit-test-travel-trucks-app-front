import { Camper } from '../redux/campers/campersSlice';
import { FEATURES_CONFIG, VEHICLE_TYPES_CONFIG } from '../config/featuresConfig';

// ✅ Типи тепер у utils - де їм місце
export interface FeatureConfig {
  key: keyof Camper;
  icon: string; // Тепер це path до SVG файлу
  label: string;
  filterKey?: string;
}

export interface Feature {
  key: keyof Camper;
  icon: string; // Тепер це path до SVG файлу
  label: string;
  condition?: boolean;
}

export interface VehicleTypeConfig {
  value: string;
  label: string;
  icon: string; // Тепер це path до SVG файлу
}

// ✅ Типізовані референси на конфіг
const typedFeaturesConfig = FEATURES_CONFIG as readonly FeatureConfig[];
const typedVehicleTypesConfig = VEHICLE_TYPES_CONFIG as readonly VehicleTypeConfig[];

// ✅ Усі утиліти тут - де їм і місце
export const getFeatureConfig = (camper: Camper): Feature[] => {
  return typedFeaturesConfig.map(feature => ({
    key: feature.key,
    icon: feature.icon,
    label:
      typeof camper[feature.key] === 'string' ? (camper[feature.key] as string) : feature.label,
    condition: camper[feature.key] as boolean,
  }));
};

export const getAvailableFeatures = (camper: Camper): Feature[] => {
  return getFeatureConfig(camper).filter(
    feature => feature.condition !== false && (feature.condition === true || feature.label),
  );
};

// ✅ Повертаємо параметр maxCount
export const getDisplayFeatures = (camper: Camper, maxCount?: number): Feature[] => {
  const features = getAvailableFeatures(camper);
  return maxCount ? features.slice(0, maxCount) : features;
};

// ✅ Утиліти для фільтрів
export const getFilterableFeatures = (): FeatureConfig[] => {
  return typedFeaturesConfig.filter(feature => feature.filterKey);
};

export const getFeatureByKey = (key: keyof Camper): FeatureConfig | undefined => {
  return typedFeaturesConfig.find(feature => feature.key === key);
};

export const getVehicleTypes = (): VehicleTypeConfig[] => {
  return [...typedVehicleTypesConfig];
};
