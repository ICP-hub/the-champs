import React, { useEffect, useState } from "react";
import { Grid, Hourglass, InfinitySpin } from "react-loader-spinner";

const FullScreenLoader = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <InfinitySpin
        visible={true}
        color="#EF4444"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
};

export default FullScreenLoader;
