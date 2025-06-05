import React from 'react';
import { Camper } from '../../redux/campers/campersSlice';
import VehicleDetails from '../VehicleDetails/VehicleDetails';
import './CamperFeatures.css';

interface CamperFeaturesProps {
  camper: Camper;
}

const CamperFeatures: React.FC<CamperFeaturesProps> = ({ camper }) => {
  const features = [
    { key: 'transmission' as keyof Camper, icon: '⚙️', label: camper.transmission },
    { key: 'engine' as keyof Camper, icon: '⛽', label: camper.engine },
    { key: 'AC' as keyof Camper, icon: '❄️', label: 'AC', condition: camper.AC },
    { key: 'bathroom' as keyof Camper, icon: '🚿', label: 'Bathroom', condition: camper.bathroom },
    { key: 'kitchen' as keyof Camper, icon: '🍳', label: 'Kitchen', condition: camper.kitchen },
    { key: 'TV' as keyof Camper, icon: '📺', label: 'TV', condition: camper.TV },
    { key: 'radio' as keyof Camper, icon: '📻', label: 'Radio', condition: camper.radio },
    {
      key: 'refrigerator' as keyof Camper,
      icon: '🧊',
      label: 'Refrigerator',
      condition: camper.refrigerator,
    },
    {
      key: 'microwave' as keyof Camper,
      icon: '🔥',
      label: 'Microwave',
      condition: camper.microwave,
    },
    { key: 'gas' as keyof Camper, icon: '🔥', label: 'Gas', condition: camper.gas },
    { key: 'water' as keyof Camper, icon: '💧', label: 'Water', condition: camper.water },
  ];

  const availableFeatures = features.filter(
    feature => feature.condition !== false && (feature.condition === true || feature.label),
  );

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
