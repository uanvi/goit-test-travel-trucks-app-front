// components/CamperFeatures.tsx
import React from 'react';
import { Camper } from '../../redux/campers/campersSlice';
import VehicleDetails from '../VehicleDetails/VehicleDetails';

interface CamperFeaturesProps {
  camper: Camper;
}

const CamperFeatures: React.FC<CamperFeaturesProps> = ({ camper }) => {
  const features = [
    'AC',
    'bathroom',
    'kitchen',
    'TV',
    'radio',
    'refrigerator',
    'microwave',
    'gas',
    'water',
  ] as const;

  return (
    <div>
      {/* Features List */}
      <div>
        {features.map(feature => (camper[feature] ? <div key={feature}>{feature}</div> : null))}
      </div>

      {/* Vehicle Details */}
      <VehicleDetails camper={camper} />
    </div>
  );
};

export default CamperFeatures;
