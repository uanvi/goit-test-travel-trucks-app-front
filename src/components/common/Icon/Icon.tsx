import React from 'react';
import { FEATURES_CONFIG, VEHICLE_TYPES_CONFIG } from '../../../config/featuresConfig';
import './Icon.css';

const ALL_ICONS = {
  ...Object.fromEntries(FEATURES_CONFIG.map(feature => [feature.key.toLowerCase(), feature.icon])),
  ...Object.fromEntries(VEHICLE_TYPES_CONFIG.map(vehicle => [vehicle.value, vehicle.icon])),
} as const;

export type IconName = keyof typeof ALL_ICONS;

interface IconProps {
  name: IconName;
  size?: 'small' | 'medium'; // 20px or 32px
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 'medium', className = '' }) => {
  const iconPath = ALL_ICONS[name];

  if (!iconPath) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <img src={iconPath} alt="" className={`icon icon--${size} ${className}`} />;
};

export default Icon;
