import React, { useState } from 'react';
import { Camper } from '../../redux/campers/campersSlice';
import { TEXTS } from '../../config/textsConfig';
import CamperFeatures from '../CamperFeatures/CamperFeatures';
import CamperReviews from '../CamperReviews/CamperReviews';
import BookingForm from '../BookingForm/BookingForm';
import './CamperDetailsContent.css';

interface CamperDetailsContentProps {
  camper: Camper;
}

const CamperDetailsContent: React.FC<CamperDetailsContentProps> = ({ camper }) => {
  const [activeTab, setActiveTab] = useState<'features' | 'reviews'>('features');

  return (
    <div className="camper-details-content">
      {/* Tabs Navigation */}
      <div className="camper-details-content__tabs-nav">
        <button
          className={`camper-details-content__tab ${
            activeTab === 'features' ? 'camper-details-content__tab--active' : ''
          }`}
          onClick={() => setActiveTab('features')}
        >
          {TEXTS.camper.tabs.features}
        </button>

        <button
          className={`camper-details-content__tab ${
            activeTab === 'reviews' ? 'camper-details-content__tab--active' : ''
          }`}
          onClick={() => setActiveTab('reviews')}
        >
          {TEXTS.camper.tabs.reviews}
        </button>
      </div>

      {/* Tab Content */}
      <div className="camper-details-content__tabs-section">
        <div className="camper-details-content__tab-content">
          {activeTab === 'features' && <CamperFeatures camper={camper} />}
          {activeTab === 'reviews' && <CamperReviews camper={camper} />}
        </div>
      </div>

      {/* Booking Form */}
      <div className="camper-details-content__booking-section">
        <BookingForm camperName={camper.name} />
      </div>
    </div>
  );
};

export default CamperDetailsContent;
