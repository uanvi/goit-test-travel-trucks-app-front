import React from 'react';
import { TEXTS } from '../../../config/textsConfig';
import './ErrorBlock.css';

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

    return errorMessage;
  };

  return (
    <div className="error-block">
      <h2 className="error-block__title">😔 {TEXTS.errors.title}</h2>
      <p className="error-block__message">{getHumanMessage(message)}</p>
      {onRetry && (
        <button onClick={onRetry} className="error-block__retry-button">
          {TEXTS.buttons.retry}
        </button>
      )}
    </div>
  );
};

export default ErrorBlock;
