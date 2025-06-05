import React from 'react';
import Icon from '../Icon/Icon';
import { Feature } from '../../utils/featuresUtils';
import './FeaturesList.css';

interface FeaturesListProps {
  features: Feature[];
  className?: string;
}

const FeaturesList: React.FC<FeaturesListProps> = ({ features, className = '' }) => {
  return (
    <div className={`features-list ${className}`}>
      {features.map(feature => (
        <div key={feature.key} className="features-list__item">
          <Icon
            name={feature.key.toLowerCase() as any}
            size="small"
            className="features-list__icon"
          />
          <span className="features-list__label">{feature.label}</span>
        </div>
      ))}
    </div>
  );
};

export default FeaturesList;
