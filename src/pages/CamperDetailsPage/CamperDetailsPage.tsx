import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCamperDetails,
  clearCamperDetails,
} from '../../redux/camperDetails/camperDetailsSlice';
import { AppDispatch, RootState } from '../../redux/store';
import ErrorBlock from '../../components/ErrorBlock';
import CamperMeta from '../../components/CamperMeta/CamperMeta';
import PriceDisplay from '../../components/PriceDisplay/PriceDisplay';
import CamperGallery from '../../components/CamperGallery/CamperGallery';
import CamperDetailsContent from '../../components/CamperDetailsContent/CamperDetailsContent';
import { TEXTS } from '../../config/textsConfig';
import './CamperDetailsPage.css';

const CamperDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { camper, loading, error } = useSelector((state: RootState) => state.camperDetails);

  useEffect(() => {
    if (!id) return;

    dispatch(clearCamperDetails());
    dispatch(fetchCamperDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(clearCamperDetails());
    };
  }, [dispatch]);

  useEffect(() => {
    if (camper?.gallery?.[0]?.thumb) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = camper.gallery[0].thumb;
      link.setAttribute('fetchpriority', 'high');
      document.head.appendChild(link);

      return () => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      };
    }
  }, [camper?.gallery]);

  const handleRetry = () => {
    if (id) {
      dispatch(fetchCamperDetails(id));
    }
  };

  if (!id) {
    return <ErrorBlock message={TEXTS.errors.notFound} />;
  }

  if (loading) {
    return (
      <div className="camper-details">
        <p>{TEXTS.loading.initial}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="camper-details">
        <ErrorBlock message={error} onRetry={handleRetry} />
      </div>
    );
  }

  if (!camper) {
    return (
      <div className="camper-details">
        <ErrorBlock message={TEXTS.errors.notFound} onRetry={handleRetry} />
      </div>
    );
  }

  return (
    <section className="camper-details">
      <div className="camper-details__header">
        <h1 className="camper-details__title">{camper.name}</h1>

        <div className="camper-details__meta">
          <CamperMeta camper={camper} />
        </div>

        <div className="camper-details__price">
          <PriceDisplay amount={camper.price} size="extra-large" />
        </div>
      </div>

      <div className="camper-details__gallery">
        <CamperGallery camper={camper} />
      </div>

      <p className="camper-details__description">{camper.description}</p>

      <CamperDetailsContent camper={camper} />
    </section>
  );
};

export default CamperDetailsPage;
