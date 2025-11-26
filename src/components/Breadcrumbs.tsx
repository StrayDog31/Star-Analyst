import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/components/Breadcrumbs.css";

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  if (pathnames[0] === "class" && pathnames.length === 2) {
    return (
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Главная</Link>
        <span className="breadcrumbs__separator">/</span>
        <Link to="/classes">Спектральные классы</Link>
        <span className="breadcrumbs__separator">/</span>
        <span>{pathnames[1]}</span>
      </nav>
    );
  }

  if (pathnames[0] === "classes") {
    return (
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Главная</Link>
        <span className="breadcrumbs__separator">/</span>
        <span>Спектральные классы</span>
      </nav>
    );
  }

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <span>Главная</span>
    </nav>
  );
}
