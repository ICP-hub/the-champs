import React, { useEffect, useState } from "react";
import { Grid } from "react-loader-spinner";

const FullScreenLoader = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center px-6">
      <Grid
        visible={true}
        height="150"
        width="150"
        color="#EF4444"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass="grid-wrapper"
      />
    </div>
  );
};

export default FullScreenLoader;
