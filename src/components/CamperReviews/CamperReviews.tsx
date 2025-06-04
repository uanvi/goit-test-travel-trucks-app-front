// components/CamperReviews.tsx
import React from 'react';
import { Camper } from '../../redux/campers/campersSlice';

interface CamperReviewsProps {
  camper: Camper;
}

const CamperReviews: React.FC<CamperReviewsProps> = ({ camper }) => {
  return (
    <ul>
      {camper.reviews.map((review, i) => (
        <li key={i} style={{ marginBottom: '1rem' }}>
          <strong>{review.reviewer_name}</strong> — ⭐ {review.reviewer_rating}
          <p>{review.comment}</p>
        </li>
      ))}
    </ul>
  );
};

export default CamperReviews;
