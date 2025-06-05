import React from 'react';
import Icon from '../Icon/Icon';
import { Feature } from '../../utils/featuresUtils';
import './FeaturesList.css';

interface FeaturesListProps {
  features: Feature[];
  maxCount?: number;
  showMoreText?: string;
  className?: string;
}

const FeaturesList: React.FC<FeaturesListProps> = ({
  features,
  maxCount,
  showMoreText = 'more',
  className = '',
}) => {
  const displayFeatures = maxCount ? features.slice(0, maxCount) : features;
  const hasMoreFeatures = maxCount ? features.length > maxCount : false;
  const remainingCount = maxCount ? features.length - maxCount : 0;

  return (
    <div className={`features-list ${className}`}>
      {displayFeatures.map(feature => (
        <div key={feature.key} className="features-list__item">
          <Icon
            name={feature.key.toLowerCase() as any}
            size="small"
            className="features-list__icon"
          />
          <span className="features-list__label">{feature.label}</span>
        </div>
      ))}

      {hasMoreFeatures && (
        <div className="features-list__item features-list__item--more">
          <span>
            +{remainingCount} {showMoreText}
          </span>
        </div>
      )}
    </div>
  );
};

export default FeaturesList;
