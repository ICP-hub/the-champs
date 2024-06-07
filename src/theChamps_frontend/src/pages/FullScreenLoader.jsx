import React, { useEffect, useState } from "react";
import { Grid, Hourglass, InfinitySpin } from "react-loader-spinner";
import FData from "./Fdata";
const FullScreenLoader = () => {
  const [quote, setQuote] = useState(null);
  useEffect(() => {
    // Function to select a random quote
    const getRandomQuote = () => {
      const randomIndex = Math.floor(Math.random() * FData.length);
      return FData[randomIndex];
    };

    // Set a random quote when the component mounts
    setQuote(getRandomQuote());
  }, []);
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <InfinitySpin
        visible={true}
        color="#EF4444"
        ariaLabel="infinity-spin-loading"
      />
      {quote && (
        <div className="text-gray-400 text-center text-sm">
          <p className="font-light">{quote.quote}</p>
          <p className="font-light italic">- {quote.author}</p>
        </div>
      )}
    </div>
  );
};

export default FullScreenLoader;
