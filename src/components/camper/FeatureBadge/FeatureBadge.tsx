import React from 'react';
import { Feature } from '../../../utils/featuresUtils';
import './FeatureBadge.css';

interface FeatureBadgeProps {
  feature: Feature;
  variant?: 'card' | 'details';
}

const FeatureBadge: React.FC<FeatureBadgeProps> = ({ feature, variant = 'card' }) => {
  return (
    <div className={`feature-badge feature-badge--${variant}`}>
      <span className="feature-badge__icon">{feature.icon}</span>
      <span className="feature-badge__label">{feature.label}</span>
    </div>
  );
};

export default FeatureBadge;
