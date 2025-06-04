import React from 'react';
import { Camper } from '../../redux/campers/campersSlice';
import { TEXTS } from '../../config/textsConfig';

interface VehicleDetailsProps {
  camper: Camper;
}

const VehicleDetails: React.FC<VehicleDetailsProps> = ({ camper }) => {
  return (
    <div>
      <h3>{TEXTS.camper.vehicle.title}</h3>
      <ul>
        <li>
          {TEXTS.camper.vehicle.form}: {camper.form}
        </li>
        <li>
          {TEXTS.camper.vehicle.length}: {camper.length}
        </li>
        <li>
          {TEXTS.camper.vehicle.width}: {camper.width}
        </li>
        <li>
          {TEXTS.camper.vehicle.height}: {camper.height}
        </li>
        <li>
          {TEXTS.camper.vehicle.tank}: {camper.tank}
        </li>
        <li>
          {TEXTS.camper.vehicle.consumption}: {camper.consumption}
        </li>
      </ul>
    </div>
  );
};

export default VehicleDetails;
