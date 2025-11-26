import React, { useEffect, useState } from "react";
import StarCart from "../components/Cart";
import Header from "../components/Navbar";
import MediaBanner from "../components/Mediabanner";
import StarCard from "../components/Card";
import Breadcrumbs from "../components/Breadcrumbs";
import { fetchClasses } from "../modules/api";
import { StarClass } from "../modules/types";
import "../styles/MainPage.css";

const mockCards = [
  { id: "1", name: "O", image: "/images/star-o.jpg" },
  { id: "2", name: "B", image: "/images/star-b.jpg" },
  { id: "3", name: "A", image: "/images/star-a.jpg" },
];

export default function HomePage() {
  const [cards, setCards] = useState<
    { id: string; name: string; image?: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

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

      <div>
        <h1 style={{ margin: "1.5rem" }}>Спектральные классы звезд</h1>
        <div className="cards__container">
          {cards.map((card) => (
            <StarCard
              key={card.id}
              id={card.id}
              name={card.name}
              image={card.image}
            />
          ))}
        </div>
      </div>

      <div style={{ padding: "0 10%" }}></div>
    </>
  );
}
