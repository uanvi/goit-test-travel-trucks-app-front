// src/components/HomePage/HomePage.tsx
import React from 'react';
import MainButton from '../MainButton/MainButton';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Campers of your dreams</h1>
          <p className="hero-subtitle">You can find everything you want in our catalog</p>
          <MainButton href="/catalog" size="wide">
            View Now
          </MainButton>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
