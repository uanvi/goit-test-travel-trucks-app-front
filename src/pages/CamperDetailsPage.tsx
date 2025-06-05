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
import './CamperDetailsPage.css';

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
    return (
      <div className="camper-details">
        <p>{TEXTS.loading.initial}</p>
      </div>
    );
  }

  // Обробка помилок
  if (error) {
    return (
      <div className="camper-details">
        <ErrorBlock message={error} onRetry={handleRetry} />
      </div>
    );
  }

  // Обробка відсутності даних
  if (!camper) {
    return (
      <div className="camper-details">
        <ErrorBlock message={TEXTS.errors.notFound} onRetry={handleRetry} />
      </div>
    );
  }

  return (
    <section className="camper-details">
      {/* Заголовок */}
      <div className="camper-details__header">
        <h1 className="camper-details__title">{camper.name}</h1>

        <div className="camper-details__meta">
          <div className="camper-details__rating">
            <span className="camper-details__star">⭐</span>
            <span>{camper.rating}</span>
            <span className="camper-details__reviews">({camper.reviews.length} Reviews)</span>
          </div>
          <div className="camper-details__location">
            <span>📍</span>
            <span>{camper.location}</span>
          </div>
        </div>

        <div className="camper-details__price">€{camper.price}</div>
      </div>

      {/* Gallery */}
      <div className="camper-details__gallery">
        <CamperGallery camper={camper} />
      </div>

      {/* Description */}
      <p className="camper-details__description">{camper.description}</p>

      {/* Main Content Layout */}
      <div className="camper-details__content">
        {/* Tab Navigation - через обидві колонки */}
        <div className="camper-details__tabs-nav">
          <button
            className={`camper-details__tab ${
              activeTab === 'features' ? 'camper-details__tab--active' : ''
            }`}
            onClick={() => setActiveTab('features')}
          >
            {TEXTS.camper.tabs.features}
          </button>

          <button
            className={`camper-details__tab ${
              activeTab === 'reviews' ? 'camper-details__tab--active' : ''
            }`}
            onClick={() => setActiveTab('reviews')}
          >
            {TEXTS.camper.tabs.reviews}
          </button>
        </div>

        {/* Left Column - Tab Content */}
        <div className="camper-details__tabs-section">
          <div className="camper-details__tab-content">
            {activeTab === 'features' && <CamperFeatures camper={camper} />}
            {activeTab === 'reviews' && <CamperReviews camper={camper} />}
          </div>
        </div>

        {/* Right Column - Booking Form */}
        <div className="camper-details__booking-section">
          <BookingForm camperName={camper.name} />
        </div>
      </div>
    </section>
  );
};

export default CamperDetailsPage;
