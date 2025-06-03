import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers } from '../redux/campers/campersSlice';
import { AppDispatch, RootState } from '../redux/store';

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

  const hasMoreItems = items.length < total;

  return (
    <section>
      <h1>Camper Catalog</h1>

      {loading && items.length === 0 && <p>Loading campers...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <ul>
        {items.map(camper => (
          <li key={camper.id}>
            {camper.name} — ₴{camper.price.toLocaleString('uk-UA')}
          </li>
        ))}
      </ul>

      {loading && items.length > 0 && <p>Loading more...</p>}

      {!loading && hasMoreItems && <button onClick={handleLoadMore}>Load More</button>}

    </section>
  );
};

export default CatalogPage;
