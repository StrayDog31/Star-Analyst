import React, { useEffect, useState } from "react";
import { fetchCartCount } from "../modules/api";
import "../styles/components/Cart.css";

export default function StarCart() {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadCartCount = async () => {
      try {
        setLoading(true);
        const cartCount = await fetchCartCount();
        setCount(cartCount);
      } catch (error) {
        console.error("Error loading cart count:", error);
        setCount(3);
      } finally {
        setLoading(false);
      }
    };

    loadCartCount();
  }, []);

  if (loading) {
    return (
      <div className="starcart">
        <div className="starcart__icon">
          <img src="/images/calc.png" alt="Cart" width="24" height="24" />
          <span className="starcart__count">...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="starcart">
      <div className="starcart__icon">
        <img src="/images/calc.png" alt="Cart" width="24" height="24" />
        <span className="starcart__count">{count}</span>
      </div>
    </div>
  );
}
