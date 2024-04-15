const CustomDivide = () => {
  return (
    <div className="flex justify-center items-center">
      <svg
        width="80"
        height="20"
        viewBox="0 0 80 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="1.62012"
            y1="9.59503"
            x2="78.3801"
            y2="9.59503"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FC001E" />
            <stop offset="1" stopColor="#FF7D57" />
          </linearGradient>
          <clipPath id="clip0">
            <rect
              width="79.9583"
              height="19.19"
              fill="white"
              transform="translate(0.0209961)"
            />
          </clipPath>
        </defs>
        <g clipPath="url(#clip0)">
          <path
            d="M1.62012 3.19836L14.4135 15.9917L27.2068 3.19836L40.0001 15.9917L52.7934 3.19836L65.5868 15.9917L78.3801 3.19836"
            stroke="url(#paint0_linear)"
            strokeWidth="4.26444"
          />
        </g>
      </svg>
    </div>
  );
};

export default CustomDivide;
