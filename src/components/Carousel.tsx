import React, { useState } from "react";
import "../styles/components/Carousel.css";

const Carousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    {
      id: 1,
      title: "Как использовать",
      description:
        "Добавляйте классы в заявку на рассчет массы. Укажите для каждого светимость и получите рассчет!.",
    },
    {
      id: 2,
      title: "Возможности",
      description:
        "Просмотри информации о классах звезд. Поиск по классам. Создание заявок на расчет.",
    },
    {
      id: 3,
      title: "Технологии",
      description:
        "React + TypeScript, Redux, Go бэкенд, PostgreSQL, GitHub Pages для хостинга.",
    },
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="simple-carousel">
      <div className="carousel-content">
        <button className="carousel-btn prev-btn" onClick={prevSlide}>
          ‹
        </button>

        <div className="slide-container">
          <div className="carousel-slide">
            <h3>{items[activeIndex].title}</h3>
            <p>{items[activeIndex].description}</p>
          </div>
        </div>

        <button className="carousel-btn next-btn" onClick={nextSlide}>
          ›
        </button>
      </div>

      <div className="carousel-dots">
        {items.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === activeIndex ? "active" : ""}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
