import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Header from "../components/Navbar";
import MediaBanner from "../components/Mediabanner";
import StarCard from "../components/Card";
import Breadcrumbs from "../components/Breadcrumbs";
import { fetchClasses } from "../modules/api";
import {
  useClasses,
  useFilterName,
  setFilterName,
} from "../modules/classSlice";
import "../styles/MainPage.css";
import Cart from "../components/Cart";
import Carousel from "../components/Carousel";

const mockCards = [
  { id: "1", name: "O", image: "/images/default.png" },
  { id: "2", name: "B", image: "/images/default.png" },
  { id: "3", name: "A", image: "/images/default.png" },
];

export default function HomePage() {
  const [cards, setCards] = useState<
    { id: string; name: string; image?: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const filterName = useFilterName();

  useEffect(() => {
    const loadClasses = async () => {
      try {
        setLoading(true);
        const classesFromApi = await fetchClasses();

        const apiCards = classesFromApi.map((cls) => ({
          id: cls.id.toString(),
          name: cls.name,
          image: cls.image_url,
        }));

        setCards(apiCards);
      } catch (error) {
        console.warn("Using mock data due to error:", error);
        setCards(mockCards);
      } finally {
        setLoading(false);
      }
    };

    loadClasses();
  }, []);

  const handleClearFilter = () => {
    dispatch(setFilterName(""));
  };

  const filteredCards = filterName
    ? cards.filter((card) =>
        card.name.toLowerCase().includes(filterName.toLowerCase())
      )
    : cards;

  if (loading) {
    return (
      <>
        <Header />
        <MediaBanner />
        <Breadcrumbs />
        <div className="container">Загрузка...</div>
      </>
    );
  }

  return (
    <>
      <Header />
      <MediaBanner />
      <Breadcrumbs />
      <Carousel/>
      <div>
        <h1 style={{ margin: "1.5rem" }}>Спектральные классы звезд</h1>

        {filterName && (
          <div
            style={{
              margin: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <div>
              <small className="text-muted">
                Активный фильтр: <strong>"{filterName}"</strong> | Найдено:{" "}
                {filteredCards.length} из {cards.length}
              </small>
            </div>
            <button
              onClick={handleClearFilter}
              className="btn btn-sm btn-outline-secondary"
              style={{ padding: "0.25rem 0.5rem" }}
            >
              × Сбросить
            </button>
          </div>
        )}

        <div className="cards__container">
          {filteredCards.length > 0 ? (
            filteredCards.map((card) => (
              <StarCard
                key={card.id}
                id={card.id}
                name={card.name}
                image={card.image}
              />
            ))
          ) : (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "3rem",
              }}
            >
              <p>Ничего не найдено по запросу "{filterName}"</p>
              <button onClick={handleClearFilter} className="btn btn-primary">
                Показать все классы
              </button>
            </div>
          )}
        </div>
      </div>
      <div style={{ padding: "0 10%" }}></div>
      <Cart />
    </>
  );
}
