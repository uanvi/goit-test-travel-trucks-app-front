import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCamperDetails, clearCamperDetails } from '../redux/camperDetails/camperDetailsSlice';
import { AppDispatch, RootState } from '../redux/store';
import ErrorBlock from '../components/ErrorBlock';
import { TEXTS } from '../config/textsConfig';
import CamperFeatures from '../components/CamperFeatures/CamperFeatures';
import CamperReviews from '../components/CamperReviews/CamperReviews';
import CamperGallery from '../components/CamperGallery/CamperGallery';
import BookingForm from '../components/BookingForm/BookingForm';

const CamperDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState<'features' | 'reviews'>('features');

  // Використовуємо Redux стан замість локального
  const { camper, loading, error } = useSelector((state: RootState) => state.camperDetails);

  useEffect(() => {
    if (!id) {
      return;
    }

    // Очищуємо попередні дані при зміні ID
    dispatch(clearCamperDetails());

    // Завантажуємо дані через Redux
    dispatch(fetchCamperDetails(id));
  }, [dispatch, id]);

  // Очищуємо дані при демонтажі компонента
  useEffect(() => {
    return () => {
      dispatch(clearCamperDetails());
    };
  }, [dispatch]);

  const handleRetry = () => {
    if (id) {
      dispatch(fetchCamperDetails(id));
    }
  };

  // Обробка відсутності ID
  if (!id) {
    return <ErrorBlock message={TEXTS.errors.notFound} />;
  }

  // Обробка стану завантаження
  if (loading) {
    return <p>{TEXTS.loading.initial}</p>;
  }

  // Обробка помилок
  if (error) {
    return <ErrorBlock message={error} onRetry={handleRetry} />;
  }

  // Обробка відсутності даних
  if (!camper) {
    return <ErrorBlock message={TEXTS.errors.notFound} onRetry={handleRetry} />;
  }

  return (
    <section>
      <h1>{camper.name}</h1>
      <p>
        ⭐ {camper.rating} ({camper.reviews.length}) | 📍 {camper.location}
      </p>
      <h2>€{camper.price.toFixed(2)}</h2>

      {/* Gallery */}
      <CamperGallery camper={camper} />

      {/* Description */}
      <p>{camper.description}</p>

      {/* Main Content Layout */}
      <div>
        {/* Left Column - Tabs Content */}
        <div>
          {/* Tab Navigation */}
          <div>
            <button onClick={() => setActiveTab('features')}>{TEXTS.camper.tabs.features}</button>

            <button onClick={() => setActiveTab('reviews')}>{TEXTS.camper.tabs.reviews}</button>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'features' && <CamperFeatures camper={camper} />}
            {activeTab === 'reviews' && <CamperReviews camper={camper} />}
          </div>
        </div>

        {/* Right Column - Booking Form */}
        <div>
          <BookingForm camperName={camper.name} />
        </div>
      </div>
    </section>
  );
};

export default CamperDetailsPage;
