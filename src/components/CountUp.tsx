import React, { useState, useEffect } from "react";

function CountUpExample() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  return <p>{count} секунди </p>;
}

export default CountUpExample;
