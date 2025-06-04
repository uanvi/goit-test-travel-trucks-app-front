// src/components/CamperCard/CamperCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Camper } from '../../redux/campers/campersSlice';
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
  ];

  const availableFeatures = features.filter(
    feature => feature.condition !== false && (feature.condition === true || feature.label),
  );

  const displayFeatures = availableFeatures.slice(0, 6); // Показуємо максимум 6 особливостей

  return (
    <div className="camper-card">
      {/* Зображення */}
      <div className="camper-card__image">
        <img
          src={camper.gallery[0]?.thumb || '/placeholder-camper.jpg'}
          alt={camper.name}
          loading="lazy"
        />
      </div>

      {/* Контент */}
      <div className="camper-card__content">
        {/* Заголовок та ціна */}
        <div className="camper-card__header">
          <div className="camper-card__title-section">
            <h3 className="camper-card__title">{camper.name}</h3>
            <div className="camper-card__price">€{camper.price.toFixed(2)}</div>
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
        <div className="camper-card__meta">
          <div className="camper-card__rating">
            <span className="camper-card__star">⭐</span>
            <span>{camper.rating}</span>
            <span className="camper-card__reviews">({camper.reviews.length} Reviews)</span>
          </div>
          <div className="camper-card__location">
            <span className="camper-card__location-icon">📍</span>
            <span>{camper.location}</span>
          </div>
        </div>

        {/* Опис */}
        <p className="camper-card__description">
          {camper.description.length > 100
            ? `${camper.description.substring(0, 100)}...`
            : camper.description}
        </p>

        {/* Особливості */}
        <div className="camper-card__features">
          {displayFeatures.map(feature => (
            <div key={feature.key} className="camper-card__feature">
              <span className="camper-card__feature-icon">{feature.icon}</span>
              <span className="camper-card__feature-label">{feature.label}</span>
            </div>
          ))}
        </div>

        {/* Кнопка Show More */}
        <Link to={`/catalog/${camper.id}`} className="camper-card__button">
          Show more
        </Link>
      </div>
    </div>
  );
};

export default CamperCard;
