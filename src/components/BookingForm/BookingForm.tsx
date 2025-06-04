import React, { useState } from 'react';
//import { TEXTS } from '../../config/textsConfig';

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
    // TODO: Додати логіку відправки форми
    console.log('Booking data:', { ...formData, camperName });
    alert(`Booking request sent for ${camperName}!`);

    // Очищуємо форму після відправки
    setFormData({
      name: '',
      email: '',
      bookingDate: '',
      comment: '',
    });
  };

  return (
    <div>
      <h3>Book your campervan now</h3>
      <p>Stay connected! We are always ready to help you.</p>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name*"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email*"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <input
            type="date"
            name="bookingDate"
            placeholder="Booking date*"
            value={formData.bookingDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <textarea
            name="comment"
            placeholder="Comment"
            value={formData.comment}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default BookingForm;
