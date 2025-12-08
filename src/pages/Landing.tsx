import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Landing.css";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/classes");
  };

  return (
    <div className="landing" onClick={handleClick}>
      <div className="landing__overlay">
        <div className="landing__content">
          <h1 className="landing__title">Звёздный Аналитик</h1>
          <p className="landing__subtitle">
            Исследуй спектральные классы звёзд — от O до M
          </p>
        </div>
      </div>
    </div>
  );
}
