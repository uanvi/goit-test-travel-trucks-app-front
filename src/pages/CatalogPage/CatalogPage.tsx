import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers, applyFilters, loadMoreWithFilters } from '../../redux/campers/campersSlice';
import { setAllFilters } from '../../redux/filters/filtersSlice';
import { AppDispatch, RootState } from '../../redux/store';
import ErrorBlock from '../../components/ErrorBlock';
import CamperCard from '../../components/CamperCard/CamperCard';
import FilterSidebar, { FilterParams } from '../../components/FilterSidebar/FilterSidebar';
import MainButton from '../../components/MainButton/MainButton';
import { TEXTS } from '../../config/textsConfig';
import './CatalogPage.css';

const CatalogPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [favorites, setFavorites] = useState<string[]>(() => {
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

  useEffect(() => {
    if (storeInitialized) return;
    dispatch(fetchCampers({ page: 1, reset: true }));
  }, [dispatch, storeInitialized]);

  useEffect(() => {
    localStorage.setItem('favoriteCampers', JSON.stringify(favorites));
  }, [favorites]);

  const handleFilterChange = (newFilters: FilterParams) => {
    dispatch(setAllFilters(newFilters));
    dispatch(applyFilters(newFilters));
  };

  const handleLoadMore = () => {
    if (!loading && items.length < total) {
      if (isFiltered) {
        dispatch(loadMoreWithFilters(currentPage + 1));
      } else {
        dispatch(fetchCampers({ page: currentPage + 1 }));
      }
    }
  };

  const handleRetryCurrentPage = () => {
    if (isFiltered && activeFilters) {
      dispatch(applyFilters(activeFilters));
    } else {
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
      <div className="catalog-page__sidebar">
        <FilterSidebar onFilterChange={handleFilterChange} isLoading={isLoading} />
      </div>

      <div className="catalog-page__content">
        {isFiltered && (
          <div className="catalog-page__header">
            <div className="catalog-page__filter-info">
              <p className="catalog-page__results-count">
                {TEXTS.catalog.foundResults
                  .replace('{count}', total.toString())
                  .replace('{plural}', total !== 1 ? 's' : '')}
              </p>

              {activeFilters && (
                <div className="catalog-page__active-filters">
                  {activeFilters.location && (
                    <span className="catalog-page__filter-tag">
                      {TEXTS.filter.location.replace('{location}', activeFilters.location)}
                    </span>
                  )}
                  {activeFilters.form && (
                    <span className="catalog-page__filter-tag">
                      {TEXTS.filter.form.replace('{form}', activeFilters.form)}
                    </span>
                  )}
                  {Object.entries(activeFilters.equipment).map(([key, value]) => {
                    if (value === true) {
                      return (
                        <span key={key} className="catalog-page__filter-tag">
                          {TEXTS.filter.equipment.replace('{equipment}', key)}
                        </span>
                      );
                    }
                    if (typeof value === 'string' && value.trim()) {
                      return (
                        <span key={key} className="catalog-page__filter-tag">
                          {TEXTS.filter.transmission.replace('{transmission}', value)}
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {loading && items.length === 0 && (
          <div className="catalog-page__loading">
            <p>{isFiltered ? TEXTS.catalog.searchingCampers : TEXTS.loading.initial}</p>
          </div>
        )}

        {error && (
          <div className="catalog-page__error">
            <ErrorBlock message={error} onRetry={handleRetryCurrentPage} />
          </div>
        )}

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

        {loading && items.length > 0 && (
          <div className="catalog-page__loading-more">
            <p>{TEXTS.loading.more}</p>
          </div>
        )}

        {!loading && hasMoreCampers && (
          <div className="catalog-page__load-more">
            <MainButton variant="secondary" onClick={handleLoadMore}>
              {TEXTS.buttons.loadMore}
            </MainButton>
          </div>
        )}

        {!loading && !hasMoreCampers && items.length > 0 && (
          <div className="catalog-page__all-loaded">
            <p>
              {isFiltered
                ? TEXTS.catalog.allFilteredLoaded
                    .replace('{count}', total.toString())
                    .replace('{plural}', total !== 1 ? 's' : '')
                : TEXTS.catalog.allLoaded}
            </p>
          </div>
        )}

        {!loading && items.length === 0 && !error && (
          <div className="catalog-page__empty">
            <p>{isFiltered ? TEXTS.catalog.noMatchingCampers : TEXTS.catalog.noCampersFound}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
