import React, { useState } from "react";
import Button from "./Button";
import { CAROUSEL_DATA } from "../utils/constants";

const ButtonList = () => {
  const list = CAROUSEL_DATA;
  const [count, setCount] = useState(0);
  const offset = 9;

  const handlePrevious = () => {
    if (count === 0) {
      return;
    } else {
      setCount(count - 1);
    }
  };

  const handleNext = () => {
    if (count === list.length - 1 - offset) {
      return;
    } else {
      setCount(count + 1);
    }
  };

  return (
    <div className="hidden md:flex object-fill">
      <button onClick={handlePrevious}>◀</button>
      {list
        .filter((b, i) => i >= count && i <= count + offset)
        .map((c, i) => (
          <Button key={i} name={c}>
            {c}
          </Button>
        ))}

      <button onClick={handleNext}>▶</button>
    </div>
  );
};

export default ButtonList;
