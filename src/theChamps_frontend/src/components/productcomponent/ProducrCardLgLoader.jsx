import React from "react";

const ProducrCardLgLoader = () => {
  return (
    <div className="rounded-2xl p-6 border-2  animate-pulse">
      <div className="grid grid-cols-3 gap-x-8">
        <div className="col-span-2  h-full w-[50%] overflow-hidden rounded-2xl">
          <div className="rounded-2xl h-full object-cover  z-[1]"></div>
        </div>
        <div className="grid grid-rows-2 gap-y-8">
          <div className="overflow-hidden rounded-2xl">
            <div className="rounded-2xl row-span-2 w-full object-cover h-full  z-[1] relative"></div>
          </div>
          <div className="overflow-hidden rounded-2xl">
            <div className="rounded-2xl h-full w-full  z-[1] relative"></div>
          </div>
        </div>
      </div>
      <div className="pt-6">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h4 className="h-6 w-40 bg-gray-200 rounded-full animate-pulse mb-2"></h4>
            <h4 className="h-6 w-40 bg-gray-200 rounded-full animate-pulse"></h4>
          </div>
          {/* <CiHeart size={48} className="cursor-pointer" /> */}
        </div>
        <div className="flex justify-between pt-6 gap-4 text-sm">
          <button className="px-4 py-2 bg-gradient-to-tr from-[#FC001E] flex items-center justify-center to-[#FF7D57]  text-white cursor-pointer  rounded-lg w-full z-[1]">
            View Collection
          </button>
          <button className="px-4 py-2  cursor-pointer rounded-lg w-full productcardlgborder z-[1]">
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProducrCardLgLoader;