import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="header__inner container">
        <Link to="/classes" className="header__logo logo">
          <div className="logo__wrapper">
            <img
              className="logo__image"
              src="/images/logo.png"
              alt="Logo"
              width="100"
              height="100"
              loading="lazy"
            />
          </div>
        </Link>
      </div>
    </header>
  );
}
