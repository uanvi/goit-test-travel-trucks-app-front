import React from 'react';
import { Camper } from '../../redux/campers/campersSlice';

interface CamperGalleryProps {
  camper: Camper;
}

const CamperGallery: React.FC<CamperGalleryProps> = ({ camper }) => {
  return (
    <div>
      {camper.gallery.map((img, i) => (
        <img key={i} src={img.thumb} alt={`${camper.name} ${i + 1}`} width={150} />
      ))}
    </div>
  );
};

export default CamperGallery;
