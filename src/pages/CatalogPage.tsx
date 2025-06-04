// src/pages/CatalogPage.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers } from '../redux/campers/campersSlice';
import { AppDispatch, RootState } from '../redux/store';
import ErrorBlock from '../components/ErrorBlock';
import CamperCard from '../components/CamperCard/CamperCard';
import { TEXTS } from '../config/textsConfig';
import './CatalogPage.css';

const CatalogPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const hasInitialized = useRef(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    // Завантажуємо обрані з localStorage
    const saved = localStorage.getItem('favoriteCampers');
    return saved ? JSON.parse(saved) : [];
  });

  const {
    items,
    loading,
    error,
    currentPage,
    total,
    hasInitialized: storeInitialized,
  } = useSelector((state: RootState) => state.campers);

  useEffect(() => {
    if (hasInitialized.current || storeInitialized) return;
    hasInitialized.current = true;
    dispatch(fetchCampers({ page: 1, reset: true }));
  }, [dispatch, storeInitialized]);

  // Зберігаємо обрані в localStorage
  useEffect(() => {
    localStorage.setItem('favoriteCampers', JSON.stringify(favorites));
  }, [favorites]);

  const handleLoadMore = () => {
    if (!loading && items.length < total) {
      dispatch(fetchCampers({ page: currentPage + 1 }));
    }
  };

  const handleRetryCurrentPage = () => {
    const page = items.length > 0 ? currentPage + 1 : 1;
    dispatch(fetchCampers({ page, reset: page === 1 }));
  };

  const handleToggleFavorite = (camperId: string) => {
    setFavorites(prev =>
      prev.includes(camperId) ? prev.filter(id => id !== camperId) : [...prev, camperId],
    );
  };

  const hasMoreCampers = items.length < total;

  return (
    <div className="catalog-page">
      {/* TODO: Тут буде FilterSidebar */}
      <div className="catalog-page__sidebar">
        <div className="filter-placeholder">
          <h3>Filters</h3>
          <p>Filter sidebar will be implemented next</p>
        </div>
      </div>

      {/* Основний контент */}
      <div className="catalog-page__content">
        {/* Стани завантаження та помилок */}
        {loading && items.length === 0 && (
          <div className="catalog-page__loading">
            <p>{TEXTS.loading.initial}</p>
          </div>
        )}

        {error && (
          <div className="catalog-page__error">
            <ErrorBlock message={error} onRetry={handleRetryCurrentPage} />
          </div>
        )}

        {/* Список кемперів */}
        {items.length > 0 && (
          <div className="catalog-page__grid">
            {items.map(camper => (
              <CamperCard
                key={camper.id}
                camper={camper}
                isFavorite={favorites.includes(camper.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}

        {/* Завантаження додаткових елементів */}
        {loading && items.length > 0 && (
          <div className="catalog-page__loading-more">
            <p>{TEXTS.loading.more}</p>
          </div>
        )}

        {/* Кнопка Load More */}
        {!loading && hasMoreCampers && (
          <div className="catalog-page__load-more">
            <button onClick={handleLoadMore} className="catalog-page__load-more-button">
              {TEXTS.buttons.loadMore}
            </button>
          </div>
        )}

        {/* Повідомлення про завершення */}
        {!loading && !hasMoreCampers && items.length > 0 && (
          <div className="catalog-page__all-loaded">
            <p>{TEXTS.catalog.allLoaded}</p>
          </div>
        )}

        {/* Порожній стан */}
        {!loading && items.length === 0 && !error && (
          <div className="catalog-page__empty">
            <p>No campers found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
