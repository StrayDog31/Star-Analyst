import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import { fetchClassById } from "../modules/api";
import { StarClass } from "../modules/types";
import "../styles/ClassDetailPage.css";
import { Navbar } from "react-bootstrap";
import Header from "../components/Navbar";

export default function ClassDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<StarClass | null>(null);

  useEffect(() => {
    if (id) {
      fetchClassById(id).then(setService);
    }
  }, [id]);

  if (!service) return <div className="container">Загрузка...</div>;

  return (
    <>
      <Header />
      <Breadcrumbs />

      <main>
        <h1 className="star__title">"{service.name}" Класс Звезды</h1>
        <div className="star__container">
          <img
            className="star__image"
            src={service.image_url || "/images/default-star.png"}
            alt={service.name}
          />
          <div className="star__info">
            <h3>Температура: {service.temperature} К</h3>
            <h3>Цвет: {service.color}</h3>
            <h3>Спектр: {service.spectre}</h3>
            <h3>Примеры: {service.examples}</h3>
          </div>
        </div>
      </main>

      <div style={{ padding: "0 10%", marginTop: "2rem" }}></div>
    </>
  );
}
