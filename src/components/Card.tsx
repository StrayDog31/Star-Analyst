import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/components/Card.css";

interface StarCardProps {
  id: string;
  name: string;
  image?: string;
}

export default function StarCard({ id, name, image }: StarCardProps) {
  const nameToIdMap: { [key: string]: string } = {
    O: "1",
    B: "2",
    A: "3",
    F: "4",
    G: "5",
    K: "6",
    M: "7",
  };

  const numericId = nameToIdMap[name] || id;

  return (
    <Card className="card">
      <div className="card__image">
        <img src={image || "/images/default-star.png"} alt={name} />
      </div>

      <div className="card__inner">
        <h3>"{name}" Класс</h3>
        <Link to={`/class/${numericId}`} className="card__button-link">
          <span className="card__button"></span>
        </Link>
      </div>
    </Card>
  );
}
