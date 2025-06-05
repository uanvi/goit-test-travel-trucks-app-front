import React from 'react';
import MainButton from '../../components/MainButton/MainButton';
import { TEXTS } from '../../config/textsConfig';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">{TEXTS.homePage.hero.title}</h1>
          <p className="hero-subtitle">{TEXTS.homePage.hero.subtitle}</p>
          <MainButton href="/catalog" size="wide">
            {TEXTS.buttons.viewNow}
          </MainButton>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
