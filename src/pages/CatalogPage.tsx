// src/pages/CatalogPage.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers, applyFilters, loadMoreWithFilters } from '../redux/campers/campersSlice';
import { setAllFilters } from '../redux/filters/filtersSlice';
import { AppDispatch, RootState } from '../redux/store';
import ErrorBlock from '../components/ErrorBlock';
import CamperCard from '../components/CamperCard/CamperCard';
import FilterSidebar, { FilterParams } from '../components/FilterSidebar/FilterSidebar';
import MainButton from '../components/MainButton/MainButton';
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
    isFiltered,
    activeFilters,
  } = useSelector((state: RootState) => state.campers);

  const filters = useSelector((state: RootState) => state.filters);

  // Початкове завантаження кемперів
  useEffect(() => {
    if (hasInitialized.current || storeInitialized) return;
    hasInitialized.current = true;
    dispatch(fetchCampers({ page: 1, reset: true }));
  }, [dispatch, storeInitialized]);

  // Зберігаємо обрані в localStorage
  useEffect(() => {
    localStorage.setItem('favoriteCampers', JSON.stringify(favorites));
  }, [favorites]);

  const handleFilterChange = (newFilters: FilterParams) => {
    // Оновлюємо Redux стор з фільтрами
    dispatch(setAllFilters(newFilters));

    // Застосовуємо фільтри і завантажуємо кемперів
    dispatch(applyFilters(newFilters));
  };

  const handleLoadMore = () => {
    if (!loading && items.length < total) {
      if (isFiltered) {
        // Якщо є активні фільтри, використовуємо спеціальний thunk
        dispatch(loadMoreWithFilters(currentPage + 1));
      } else {
        // Звичайне завантаження
        dispatch(fetchCampers({ page: currentPage + 1 }));
      }
    }
  };

  const handleRetryCurrentPage = () => {
    if (isFiltered && activeFilters) {
      // Повторюємо із фільтрами
      dispatch(applyFilters(activeFilters));
    } else {
      // Звичайне повторення
      const page = items.length > 0 ? currentPage + 1 : 1;
      dispatch(fetchCampers({ page, reset: page === 1 }));
    }
  };

  const handleToggleFavorite = (camperId: string) => {
    setFavorites(prev =>
      prev.includes(camperId) ? prev.filter(id => id !== camperId) : [...prev, camperId],
    );
  };

  const hasMoreCampers = items.length < total;
  const isLoading = loading;

  return (
    <div className="catalog-page">
      {/* Filter Sidebar */}
      <div className="catalog-page__sidebar">
        <FilterSidebar onFilterChange={handleFilterChange} isLoading={isLoading} />
      </div>

      {/* Основний контент */}
      <div className="catalog-page__content">
        {/* Заголовок з інформацією про фільтри */}
        <div className="catalog-page__header">
          {isFiltered && (
            <div className="catalog-page__filter-info">
              <p className="catalog-page__results-count">
                Found {total} camper{total !== 1 ? 's' : ''}
              </p>

              {activeFilters && (
                <div className="catalog-page__active-filters">
                  {activeFilters.location && (
                    <span className="catalog-page__filter-tag">📍 {activeFilters.location}</span>
                  )}
                  {activeFilters.form && (
                    <span className="catalog-page__filter-tag">🚐 {activeFilters.form}</span>
                  )}
                  {Object.entries(activeFilters.equipment).map(([key, value]) => {
                    if (value === true) {
                      return (
                        <span key={key} className="catalog-page__filter-tag">
                          ✓ {key}
                        </span>
                      );
                    }
                    if (typeof value === 'string' && value.trim()) {
                      return (
                        <span key={key} className="catalog-page__filter-tag">
                          ⚙️ {value}
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Стани завантаження та помилок */}
        {loading && items.length === 0 && (
          <div className="catalog-page__loading">
            <p>{isFiltered ? 'Searching campers...' : TEXTS.loading.initial}</p>
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
            <MainButton variant="secondary" onClick={handleLoadMore}>
              {TEXTS.buttons.loadMore}
            </MainButton>
          </div>
        )}

        {/* Повідомлення про завершення */}
        {!loading && !hasMoreCampers && items.length > 0 && (
          <div className="catalog-page__all-loaded">
            <p>
              {isFiltered
                ? `All ${total} filtered camper${total !== 1 ? 's' : ''} loaded!`
                : TEXTS.catalog.allLoaded}
            </p>
          </div>
        )}

        {/* Порожній стан */}
        {!loading && items.length === 0 && !error && (
          <div className="catalog-page__empty">
            <p>
              {isFiltered
                ? 'No campers match your filters. Try adjusting your search criteria.'
                : 'No campers found'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
