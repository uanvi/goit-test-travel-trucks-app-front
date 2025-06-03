import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers } from '../redux/campers/campersSlice';
import { AppDispatch, RootState } from '../redux/store';
import ErrorBlock from '../components/ErrorBlock';
import { TEXTS } from '../config/textsConfig';

const CatalogPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const hasInitialized = useRef(false);

  const {
    items,
    loading,
    error,
    currentPage,
    total,
    hasInitialized: storeInitialized,
  } = useSelector((state: RootState) => state.campers);

  useEffect(() => {
    // avoid duplication
    if (hasInitialized.current || storeInitialized) {
      return;
    }

    hasInitialized.current = true;
    dispatch(fetchCampers({ page: 1, reset: true }));
  }, [dispatch, storeInitialized]);

  const handleLoadMore = () => {
    if (!loading && hasMoreItems) {
      dispatch(fetchCampers({ page: currentPage + 1 }));
    }
  };

  const handleRetryCurrentPage = () => {
    if (items.length > 0) {
      dispatch(fetchCampers({ page: currentPage + 1 }));
    } else {
      dispatch(fetchCampers({ page: 1, reset: true }));
    }
  };

  const hasMoreItems = items.length < total;

  return (
    <section>
      <h1>{TEXTS.catalog.title}</h1>

      {loading && items.length === 0 && <p>{TEXTS.loading.initial}</p>}
      {error && <ErrorBlock message={error} onRetry={handleRetryCurrentPage} />}

      <ul>
        {items.map(camper => (
          <li key={camper.id}>
            {camper.name} — €{camper.price.toFixed(2)}
          </li>
        ))}
      </ul>

      {loading && items.length > 0 && <p>{TEXTS.loading.more}</p>}

      {!loading && hasMoreItems && (
        <button onClick={handleLoadMore}>{TEXTS.buttons.loadMore}</button>
      )}
    </section>
  );
};

export default CatalogPage;
