import React, { memo } from 'react';
import './PriceDisplay.css';

interface PriceDisplayProps {
  amount: number;
  currency?: string;
  size?: 'small' | 'medium' | 'large' | 'extra-large';
  color?: 'primary' | 'accent' | 'secondary';
  className?: string;
  showCurrency?: boolean;
}

const PriceDisplay: React.FC<PriceDisplayProps> = memo(
  ({
    amount,
    currency = '€',
    size = 'medium',
    color = 'primary',
    className = '',
    showCurrency = true,
  }) => {
    const formatPrice = (price: number): string => {
      return new Intl.NumberFormat('en-US').format(price);
    };

    return (
      <span className={`price-display price-display--${size} price-display--${color} ${className}`}>
        {showCurrency && <span className="price-display__currency">{currency}</span>}
        <span className="price-display__amount">{formatPrice(amount)}</span>
      </span>
    );
  },
);

PriceDisplay.displayName = 'PriceDisplay';

export default PriceDisplay;
