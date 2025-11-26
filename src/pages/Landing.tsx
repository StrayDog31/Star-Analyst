import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Landing.css';

export default function LandingPage() {
  return (
    <div className="landing">
      <div className="landing__overlay">
        <div className="landing__content">
          <h1 className="landing__title">Звёздный Аналитик</h1>
          <p className="landing__subtitle">
            Исследуй спектральные классы звёзд — от O до M
          </p>
          <Link to="/classes" className="landing__button button">
            Начать исследование
          </Link>
        </div>
      </div>
    </div>
  );
}