import React from 'react';
import { TEXTS } from '../config/textsConfig';

interface ErrorBlockProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorBlock: React.FC<ErrorBlockProps> = ({ message = TEXTS.errors.default, onRetry }) => {
  const getHumanMessage = (errorMessage: string) => {
    const lowerMessage = errorMessage.toLowerCase();

    if (lowerMessage.includes('network')) {
      return TEXTS.errors.network;
    }
    if (lowerMessage.includes('timeout')) {
      return TEXTS.errors.timeout;
    }
    if (lowerMessage.includes('404')) {
      return TEXTS.errors.notFound;
    }
    if (lowerMessage.includes('500') || lowerMessage.includes('server')) {
      return TEXTS.errors.server;
    }

    return TEXTS.errors.default;
  };

  return (
    <div style={{ color: 'crimson', padding: '1rem', textAlign: 'center' }}>
      <h2>😔 {TEXTS.errors.title}</h2>
      <p>{getHumanMessage(message)}</p>
      {onRetry && (
        <button onClick={onRetry} style={{ marginTop: '1rem' }}>
          {TEXTS.buttons.retry}
        </button>
      )}
    </div>
  );
};

export default ErrorBlock;
