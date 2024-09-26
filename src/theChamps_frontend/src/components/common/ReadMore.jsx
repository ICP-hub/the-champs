import React, { useState } from "react";

const ReadMore = ({ text, maxLength, readmore }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  return (
    <div className="w-full overflow-hidden text-ellipsis">
      {isTruncated ? (
        <div className="w-full overflow-hidden text-ellipsis">
          {text?.slice(0, maxLength)}
          {text.length > maxLength && "... "}
          {readmore && (
            <button
              onClick={toggleTruncate}
              className="text-sm  text-transparent  bg-gradient-to-r from-[#FC001E] to-[#FF7D57] bg-clip-text font-bold"
            >
              Read More
            </button>
          )}
        </div>
      ) : (
        <div className="overflow-hidden text-ellipsis w-full">
          {text}{" "}
          <button
            onClick={toggleTruncate}
            className="text-sm  text-transparent  bg-gradient-to-r from-[#FC001E] to-[#FF7D57] bg-clip-text font-bold"
          >
            Read Less
          </button>
        </div>
      )}
    </div>
  );
};

export default ReadMore;
