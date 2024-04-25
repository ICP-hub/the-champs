import React from "react";

const ProductCardLoader = ({ product }) => {
  return (
    <div className="bg-white/50 backdrop-blur-sm p-2 rounded-2xl overflow-hidden mx-2 border-[1px]">
      <div className="w-full object-cover h-[400px] bg-gray-300 rounded-xl mb-2 animate-pulse"></div>

      <div className="flex justify-between items-center px-1 mb-2">
        <h4 className="h-6 w-40 bg-gray-200 rounded-full animate-pulse"></h4>
      </div>
      <div className="flex justify-between items-center px-1">
        <h4 className="h-5 w-20 bg-gray-200 rounded-full animate-pulse"></h4>
      </div>
    </div>
  );
};

export default ProductCardLoader;
