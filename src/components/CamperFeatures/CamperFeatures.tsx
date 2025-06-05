import React from 'react';
import { Camper } from '../../redux/campers/campersSlice';
import VehicleDetails from '../VehicleDetails/VehicleDetails';
import FeaturesList from '../FeaturesList/FeaturesList';
import { getAvailableFeatures } from '../../utils/featuresUtils';
import './CamperFeatures.css';

interface CamperFeaturesProps {
  camper: Camper;
}

const CamperFeatures: React.FC<CamperFeaturesProps> = ({ camper }) => {
  const availableFeatures = getAvailableFeatures(camper);

  return (
    <div className="camper-features">
      <FeaturesList features={availableFeatures} className="camper-features__list" />

      <div className="camper-features__vehicle-details">
        <VehicleDetails camper={camper} />
      </div>
    </div>
  );
};

export default CamperFeatures;
