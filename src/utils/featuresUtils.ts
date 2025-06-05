import { Camper } from '../redux/campers/campersSlice';
import { FEATURES_CONFIG, VEHICLE_TYPES_CONFIG } from '../config/featuresConfig';

export interface FeatureConfig {
  key: keyof Camper;
  icon: string;
  label: string;
  filterKey?: string;
}

export interface Feature {
  key: keyof Camper;
  icon: string;
  label: string;
  condition?: boolean;
}

export interface VehicleTypeConfig {
  value: string;
  label: string;
  icon: string;
}

const typedFeaturesConfig = FEATURES_CONFIG as readonly FeatureConfig[];
const typedVehicleTypesConfig = VEHICLE_TYPES_CONFIG as readonly VehicleTypeConfig[];

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
    feature =>
      feature.condition === true ||
      (typeof feature.condition === 'string' && feature.condition.trim()),
  );
};

export const getDisplayFeatures = (camper: Camper, maxCount?: number): Feature[] => {
  const features = getAvailableFeatures(camper);
  return maxCount ? features.slice(0, maxCount) : features;
};

export const getFilterableFeatures = (): FeatureConfig[] => {
  return typedFeaturesConfig.filter(feature => feature.filterKey);
};

export const getFeatureByKey = (key: keyof Camper): FeatureConfig | undefined => {
  return typedFeaturesConfig.find(feature => feature.key === key);
};

export const getVehicleTypes = (): VehicleTypeConfig[] => {
  return [...typedVehicleTypesConfig];
};
