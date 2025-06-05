import React from 'react';
import { Camper } from '../../redux/campers/campersSlice';
import VehicleDetails from '../VehicleDetails/VehicleDetails';
import { getAvailableFeatures } from '../../utils/featuresUtils';
import './CamperFeatures.css';

interface CamperFeaturesProps {
  camper: Camper;
}

const CamperFeatures: React.FC<CamperFeaturesProps> = ({ camper }) => {
  // ✅ Використовуємо єдиний підхід з utils
  const availableFeatures = getAvailableFeatures(camper);

  return (
    <div className="camper-features">
      {/* Features List */}
      <div className="camper-features__list">
        {availableFeatures.map(feature => (
          <div
            key={feature.key}
            className="camper-features__feature camper-features__feature_details"
          >
            <span className="camper-features__feature-icon">{feature.icon}</span>
            <span className="camper-features__feature-label">{feature.label}</span>
          </div>
        ))}
      </div>

      {/* Vehicle Details */}
      <div className="camper-features__vehicle-details">
        <VehicleDetails camper={camper} />
      </div>
    </div>
  );
};

export default CamperFeatures;
