import React, { memo } from 'react';
import { Camper } from '../../../redux/campers/campersSlice';
import { TEXTS } from '../../../config/textsConfig';
import './CamperMeta.css';

interface CamperMetaProps {
  camper: Camper;
  showReviews?: boolean;
  className?: string;
}

const CamperMeta: React.FC<CamperMetaProps> = memo(
  ({ camper, showReviews = true, className = '' }) => {
    return (
      <div className={`camper-meta ${className}`}>
        <div className="camper-meta__rating">
          <span className="camper-meta__star">{TEXTS.symbols.star}</span>
          <span>{camper.rating}</span>
          {showReviews && (
            <span className="camper-meta__reviews">({camper.reviews.length} Reviews)</span>
          )}
        </div>
        <div className="camper-meta__location">
          <img
            src="/icons/map.svg"
            alt=""
            width="20"
            height="20"
            className="camper-meta__location-icon"
          />
          <span>{camper.location}</span>
        </div>
      </div>
    );
  },
);

CamperMeta.displayName = 'CamperMeta';

export default CamperMeta;
