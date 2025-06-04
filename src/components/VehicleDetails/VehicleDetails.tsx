import React from 'react';
import { Camper } from '../../redux/campers/campersSlice';
import { TEXTS } from '../../config/textsConfig';
import './VehicleDetails.css';

interface VehicleDetailsProps {
  camper: Camper;
}

const VehicleDetails: React.FC<VehicleDetailsProps> = ({ camper }) => {
  return (
    <div className="vehicle-details">
      <h3 className="vehicle-details__title">{TEXTS.camper.vehicle.title}</h3>
      <ul className="vehicle-details__list">
        <li className="vehicle-details__item">
          <span className="vehicle-details__label">{TEXTS.camper.vehicle.form}</span>
          <span className="vehicle-details__value">{camper.form}</span>
        </li>
        <li className="vehicle-details__item">
          <span className="vehicle-details__label">{TEXTS.camper.vehicle.length}</span>
          <span className="vehicle-details__value">{camper.length}</span>
        </li>
        <li className="vehicle-details__item">
          <span className="vehicle-details__label">{TEXTS.camper.vehicle.width}</span>
          <span className="vehicle-details__value">{camper.width}</span>
        </li>
        <li className="vehicle-details__item">
          <span className="vehicle-details__label">{TEXTS.camper.vehicle.height}</span>
          <span className="vehicle-details__value">{camper.height}</span>
        </li>
        <li className="vehicle-details__item">
          <span className="vehicle-details__label">{TEXTS.camper.vehicle.tank}</span>
          <span className="vehicle-details__value">{camper.tank}</span>
        </li>
        <li className="vehicle-details__item">
          <span className="vehicle-details__label">{TEXTS.camper.vehicle.consumption}</span>
          <span className="vehicle-details__value">{camper.consumption}</span>
        </li>
      </ul>
    </div>
  );
};

export default VehicleDetails;
