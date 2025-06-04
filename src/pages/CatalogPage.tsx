import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers } from '../redux/campers/campersSlice';
import { AppDispatch, RootState } from '../redux/store';
import ErrorBlock from '../components/ErrorBlock';
import { TEXTS } from '../config/textsConfig';
import { Link } from 'react-router-dom';

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
    if (hasInitialized.current || storeInitialized) return;
    hasInitialized.current = true;
    dispatch(fetchCampers({ page: 1, reset: true }));
  }, [dispatch, storeInitialized]);

  const handleLoadMore = () => {
    if (!loading && items.length < total) {
      dispatch(fetchCampers({ page: currentPage + 1 }));
    }
  };

  const handleRetryCurrentPage = () => {
    const page = items.length > 0 ? currentPage + 1 : 1;
    dispatch(fetchCampers({ page, reset: page === 1 }));
  };

  return (
    <section>
      <h1>{TEXTS.catalog.title}</h1>

      {loading && items.length === 0 && <p>{TEXTS.loading.initial}</p>}
      {error && <ErrorBlock message={error} onRetry={handleRetryCurrentPage} />}

      <ul>
        {items.map(camper => (
          <li key={camper.id}>
            <Link to={`/catalog/${camper.id}`}>
              {camper.name} — €{camper.price.toFixed(2)}
            </Link>
          </li>
        ))}
      </ul>

      {loading && items.length > 0 && <p>{TEXTS.loading.more}</p>}

      {!loading && items.length < total && (
        <button onClick={handleLoadMore}>{TEXTS.buttons.loadMore}</button>
      )}
    </section>
  );
};

export default CatalogPage;
