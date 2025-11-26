import React from "react";
import '../styles/components/Cart.css'

export default function StarCart({ count = 3 }: { count?: number }) {
  return (
    <div className="starcart">
      <div className="starcart__icon">
        <img src="/images/calc.png" alt="Cart" width="24" height="24" />
        <span className="starcart__count">{count}</span>
      </div>
    </div>
  );
}
