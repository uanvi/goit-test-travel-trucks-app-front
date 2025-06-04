import React from 'react';
import { Camper } from '../../redux/campers/campersSlice';
import './CamperReviews.css';

interface CamperReviewsProps {
  camper: Camper;
}

const CamperReviews: React.FC<CamperReviewsProps> = ({ camper }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`camper-reviews__star ${i <= rating ? '' : 'camper-reviews__star--empty'}`}
        >
          ⭐
        </span>,
      );
    }
    return stars;
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2);
  };

  return (
    <ul className="camper-reviews">
      {camper.reviews.map((review, i) => (
        <li key={i} className="camper-reviews__item">
          <div className="camper-reviews__header">
            <div className="camper-reviews__avatar">{getInitials(review.reviewer_name)}</div>
            <div className="camper-reviews__info">
              <h4 className="camper-reviews__name">{review.reviewer_name}</h4>
              <div className="camper-reviews__rating">{renderStars(review.reviewer_rating)}</div>
            </div>
          </div>
          <p className="camper-reviews__comment">{review.comment}</p>
        </li>
      ))}
    </ul>
  );
};

export default CamperReviews;
