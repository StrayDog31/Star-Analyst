import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setFilterName } from "../modules/classSlice";
import "../styles/components/MediaBanner.css";

export default function MediaBanner() {
  const dispatch = useDispatch();
  const [localSearch, setLocalSearch] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setFilterName(localSearch));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
  };

  return (
    <section className="mediabanner">
      <div className="mediabanner__image">
        <img src="/images/main-star.png" alt="" className="img-fluid" />
      </div>
      <div className="mediabanner__content container">
        <div className="mediabanner__functional d-flex flex-column flex-md-row align-items-md-center gap-3">
          <form
            className="mediabanner__search search d-flex w-100"
            role="search"
            onSubmit={handleSearchSubmit}
          >
            <input
              type="search"
              className="search__input form-control flex-grow-1"
              placeholder="Поиск"
              value={localSearch}
              onChange={handleInputChange}
            />
            <button
              className="search__button button btn btn-outline-light ms-2"
              type="submit"
            >
              Найти
            </button>
          </form>
        </div>
        <figure className="mediabanner__quoteblock text-center mt-4">
          <blockquote className="quoteblock__quote">
            Космос есть внутри нас. <br />
            Мы сделаны из звёздного вещества, <br />
            мы — это способ, которым Космос познаёт себя
          </blockquote>
          <figcaption className="mediabanner__author">© Карл Саган</figcaption>
        </figure>
      </div>
    </section>
  );
}
