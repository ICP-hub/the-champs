import React, { useEffect, useState } from "react";
import { Grid, Hourglass, InfinitySpin } from "react-loader-spinner";

const FullScreenLoader = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center px-6">
      <InfinitySpin
        visible={true}
        height="300"
        width="300"
        color="#EF4444"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
};

export default FullScreenLoader;
