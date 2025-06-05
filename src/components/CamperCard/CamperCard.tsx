import React, { memo, useCallback } from 'react';
import { Camper } from '../../redux/campers/campersSlice';
import MainButton from '../MainButton/MainButton';
import CamperMeta from '../CamperMeta/CamperMeta';
import PriceDisplay from '../PriceDisplay/PriceDisplay';
import FeaturesList from '../FeaturesList/FeaturesList';
import { getAvailableFeatures } from '../../utils/featuresUtils';
import './CamperCard.css';

interface CamperCardProps {
  camper: Camper;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

const CamperCard: React.FC<CamperCardProps> = memo(
  ({ camper, isFavorite = false, onToggleFavorite }) => {
    const handleFavoriteClick = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onToggleFavorite?.(camper.id);
      },
      [camper.id, onToggleFavorite],
    );

    const features = getAvailableFeatures(camper);

    const description =
      camper.description.length > 60
        ? `${camper.description.substring(0, 60)}...`
        : camper.description;

    return (
      <div className="camper-card">
        <div className="camper-card__image">
          <img
            src={camper.gallery[0]?.thumb || '/placeholder-camper.jpg'}
            alt={camper.name}
            loading="lazy"
            fetchPriority="low"
            width="292"
            height="312"
          />
        </div>

        <div className="camper-card__content">
          <div className="camper-card__header">
            <div className="camper-card__title-section">
              <h3 className="camper-card__title">{camper.name}</h3>
              <PriceDisplay amount={camper.price} size="large" className="camper-card__price" />
              <button
                className={`camper-card__favorite ${
                  isFavorite ? 'camper-card__favorite--active' : ''
                }`}
                onClick={handleFavoriteClick}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <span className="camper-card__heart">{isFavorite ? '❤️' : '🤍'}</span>
              </button>
            </div>
          </div>

          <CamperMeta camper={camper} />

          <p className="camper-card__description">{description}</p>

          <FeaturesList
            features={features}
            maxCount={5}
            showMoreText="more"
            className="camper-card__features"
          />

          <MainButton href={`/catalog/${camper.id}`} size="default">
            Show more
          </MainButton>
        </div>
      </div>
    );
  },
);

CamperCard.displayName = 'CamperCard';

export default CamperCard;
