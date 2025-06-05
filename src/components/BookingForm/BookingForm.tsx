import React, { useState } from 'react';
import MainButton from '../MainButton/MainButton';
import './BookingForm.css';

interface BookingFormProps {
  camperName: string;
}

interface BookingFormData {
  name: string;
  email: string;
  bookingDate: string;
  comment: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ camperName }) => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    bookingDate: '',
    comment: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking data:', { ...formData, camperName });
    alert(`Booking request sent for ${camperName}!`);

    setFormData({
      name: '',
      email: '',
      bookingDate: '',
      comment: '',
    });
  };

  return (
    <div className="booking-form">
      <h3 className="booking-form__title">Book your campervan now</h3>
      <p className="booking-form__subtitle">Stay connected! We are always ready to help you.</p>

      <form onSubmit={handleSubmit} className="booking-form__form">
        <div className="booking-form__field">
          <input
            type="text"
            name="name"
            placeholder="Name*"
            value={formData.name}
            onChange={handleChange}
            required
            className="booking-form__input"
          />
        </div>

        <div className="booking-form__field">
          <input
            type="email"
            name="email"
            placeholder="Email*"
            value={formData.email}
            onChange={handleChange}
            required
            className="booking-form__input"
          />
        </div>

        <div className="booking-form__field">
          <input
            type="date"
            name="bookingDate"
            value={formData.bookingDate}
            onChange={handleChange}
            required
            className="booking-form__input"
            data-placeholder="Booking date*"
          />
        </div>

        <div className="booking-form__field">
          <textarea
            name="comment"
            placeholder="Comment"
            value={formData.comment}
            onChange={handleChange}
            rows={5}
            className="booking-form__textarea"
            style={{ resize: 'none' }}
          />
        </div>

        <MainButton type="submit" size="default" className="main-button--full-width">
          Send
        </MainButton>
      </form>
    </div>
  );
};

export default BookingForm;
