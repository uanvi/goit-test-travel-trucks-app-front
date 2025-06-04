import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Campers of your dreams</h1>
          <p className="hero-subtitle">You can find everything you want in our catalog</p>
          <Link to="/catalog" className="hero-button">
            View Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
