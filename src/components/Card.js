import React, { useState } from "react";
import "./style/card.css";

export default function Card({
  subject,
  duration,
  onDecrease,
  onIncrease,
  onDelete,
}) {
  const [count, setCount] = useState(+duration);
  const updateOnIncrease = () => {
    onIncrease();
    setCount(count + 1);
  };
  const updateOnDecrease = () => {
    if (count >= 1) {
      onDecrease();
      setCount(count - 1);
    }
  };

  const updateAfterDelete = () => {
    onDelete();
  };
  return (
    <>
      <div className="card-item">
        <div className="subject-box">{subject}</div>
        <div className="duration-box">{count} Hour</div>
        <div className="duration-manager-box">
          <button className="increamenter" onClick={updateOnIncrease}>
            +
          </button>
          <button className="decreamenter" onClick={updateOnDecrease}>
            -
          </button>
          <button className="deleteItem" onClick={updateAfterDelete}>
            {" "}
            ❎{" "}
          </button>
        </div>
      </div>
    </>
  );
}