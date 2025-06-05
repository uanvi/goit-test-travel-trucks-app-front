import React from 'react';
import { Camper } from '../../redux/campers/campersSlice';
import MainButton from '../MainButton/MainButton';
import Icon from '../Icon/Icon';
import CamperMeta from '../CamperMeta/CamperMeta';
import PriceDisplay from '../PriceDisplay/PriceDisplay';
import { getDisplayFeatures, getAvailableFeatures } from '../../utils/featuresUtils';
import './CamperCard.css';

interface CamperCardProps {
  camper: Camper;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

const CamperCard: React.FC<CamperCardProps> = ({
  camper,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite?.(camper.id);
  };

  // ✅ Показуємо 5 features + "+N more" як 6-й елемент
  const displayFeatures = getDisplayFeatures(camper, 5);
  const allFeatures = getAvailableFeatures(camper);
  const hasMoreFeatures = allFeatures.length > 5;
  const remainingCount = allFeatures.length - 5;

  return (
    <div className="camper-card">
      {/* Зображення */}
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

      {/* Контент */}
      <div className="camper-card__content">
        {/* Заголовок та ціна */}
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

        {/* Рейтинг та локація */}
        <CamperMeta camper={camper} />

        {/* Опис */}
        <p className="camper-card__description">
          {camper.description.length > 60
            ? `${camper.description.substring(0, 60)}...`
            : camper.description}
        </p>

        {/* Особливості - ✅ Єдиний flex контейнер */}
        <div className="camper-card__features features-list">
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
              <span>+{remainingCount} more</span>
            </div>
          )}
        </div>

        {/* Кнопка Show More */}
        <MainButton href={`/catalog/${camper.id}`} size="default">
          Show more
        </MainButton>
      </div>
    </div>
  );
};

export default CamperCard;
