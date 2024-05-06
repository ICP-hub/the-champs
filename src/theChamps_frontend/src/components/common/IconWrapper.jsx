import React from "react";

const IconWrapper = ({ children }) => {
  const gradientId = `gradient-${Math.random().toString(36)}`;
  return (
    <div>
      <svg width="0" height="0">
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#FC001E", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#FF7D57", stopOpacity: 1 }}
          />
        </linearGradient>
      </svg>
      {React.cloneElement(children, {
        style: {
          width: "100%",
          height: "100%",
          fill: `url(#${gradientId})`,
          stroke: `url(#${gradientId})`,
        },
      })}
    </div>
  );
};

export default IconWrapper;
