import React from 'react';
import './PriceDisplay.css';

interface PriceDisplayProps {
  amount: number;
  currency?: string;
  size?: 'small' | 'medium' | 'large' | 'extra-large';
  color?: 'primary' | 'accent' | 'secondary';
  className?: string;
  showCurrency?: boolean;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({
  amount,
  currency = '€',
  size = 'medium',
  color = 'primary',
  className = '',
  showCurrency = true,
}) => {
  const formatPrice = (price: number): string => {
    // Форматуємо число з розділенням тисяч комами (якщо потрібно)
    return new Intl.NumberFormat('en-US').format(price);
  };

  return (
    <span className={`price-display price-display--${size} price-display--${color} ${className}`}>
      {showCurrency && <span className="price-display__currency">{currency}</span>}
      <span className="price-display__amount">{formatPrice(amount)}</span>
    </span>
  );
};

export default PriceDisplay;
