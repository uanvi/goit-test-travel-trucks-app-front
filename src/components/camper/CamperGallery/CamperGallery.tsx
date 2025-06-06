import React from 'react';
import { Camper } from '../../../redux/campers/campersSlice';
import './CamperGallery.css';

interface CamperGalleryProps {
  camper: Camper;
}

const CamperGallery: React.FC<CamperGalleryProps> = ({ camper }) => {
  return (
    <div className="camper-gallery">
      {camper.gallery.map((img, i) => (
        <div key={i} className="camper-gallery__item">
          <img
            src={img.thumb}
            alt={`${camper.name} ${i + 1}`}
            className="camper-gallery__image"
            loading={i === 0 ? 'eager' : 'lazy'}
            fetchPriority={i === 0 ? 'high' : 'low'}
            width="292"
            height="312"
          />
        </div>
      ))}
    </div>
  );
};

export default CamperGallery;
